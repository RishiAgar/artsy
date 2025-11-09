#!/usr/bin/env node

const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const envFiles = [
    { file: '.env', override: false },
    { file: '.env.local', override: true },
];

const loadEnvFile = (filePath, override = false) => {
    if (!fsSync.existsSync(filePath)) {
        return;
    }

    const raw = fsSync.readFileSync(filePath, 'utf8');
    raw.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) {
            return;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        if (!key) {
            return;
        }

        if (!override && process.env[key] !== undefined) {
            return;
        }

        process.env[key] = value;
    });
};

envFiles.forEach(({ file, override }) => {
    loadEnvFile(path.resolve(projectRoot, file), override);
});

const DEFAULT_API_BASE = 'https://dummyjson.com/';
const DEFAULT_SITE_BASE = 'http://localhost:3000';

const ensureAbsoluteUrl = (value, fallback, { stripTrailingSlash = false } = {}) => {
    const format = (input) => {
        const serialized = new URL(input).toString();
        if (stripTrailingSlash) {
            return serialized.replace(/\/$/, '');
        }
        return serialized.endsWith('/') ? serialized : `${serialized}/`;
    };

    const candidate = typeof value === 'string' ? value.trim() : '';

    if (candidate) {
        try {
            return format(candidate);
        } catch (error) {
            console.warn(`Invalid URL "${candidate}", falling back to "${fallback}".`);
        }
    }

    return format(fallback);
};

const API_BASE = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_API_URL, DEFAULT_API_BASE);
const SITE_BASE = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_WEBSITE_ADDRESS, DEFAULT_SITE_BASE, { stripTrailingSlash: true });
const OUTPUT_FILE = path.resolve(projectRoot, 'public', 'sitemap.xml');
const CATEGORIES_FILE = path.resolve(projectRoot, 'helpers', 'constants', 'categories.json');
const PRODUCTS_PER_REQUEST = 100;
const LISTING_PAGE_SIZE = 24; // Keep in sync with DEFAULT_SKIP in app/page.js & app/categories/[category]/page.js

const STATIC_ROUTES = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/cart', priority: '0.4', changefreq: 'weekly' },
];

if (typeof fetch !== 'function') {
    throw new Error('Global fetch is unavailable in this Node version. Please upgrade to Node 18 or newer.');
}

const nowIso = new Date().toISOString();

const ensureLeadingSlash = (value = '/') => (value.startsWith('/') ? value : `/${value}`);

const normalizeDate = (date) => {
    const d = new Date(date || nowIso);
    return Number.isNaN(d.getTime()) ? nowIso : d.toISOString();
};

const resolveLoc = (pathOrUrl) => {
    if (!pathOrUrl) {
        return SITE_BASE;
    }

    if (/^https?:\/\//i.test(pathOrUrl)) {
        return pathOrUrl;
    }

    return `${SITE_BASE}${ensureLeadingSlash(pathOrUrl)}`;
};

const addUrl = (collection, { path: pathOrUrl, loc, priority = '0.7', changefreq = 'weekly', lastmod = nowIso }) => {
    const resolvedLoc = loc || resolveLoc(pathOrUrl);
    if (!resolvedLoc) {
        return;
    }

    collection.set(resolvedLoc, {
        loc: resolvedLoc,
        priority,
        changefreq,
        lastmod: normalizeDate(lastmod),
    });
};

const addPaginatedUrls = (collection, { basePath, totalItems, pageSize = LISTING_PAGE_SIZE, priority, changefreq }) => {
    if (!basePath || !Number.isFinite(totalItems) || totalItems <= 0) {
        return;
    }

    const effectivePageSize = Number(pageSize) > 0 ? Number(pageSize) : LISTING_PAGE_SIZE;
    if (totalItems <= effectivePageSize) {
        return;
    }

    const totalPages = Math.ceil(totalItems / effectivePageSize);
    for (let page = 2; page <= totalPages; page += 1) {
        addUrl(collection, {
            path: `${basePath}?page=${page}`,
            priority,
            changefreq,
        });
    }
};

const buildApiUrl = (pathname, params = {}) => {
    const url = new URL(pathname, API_BASE);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, value);
        }
    });

    return url.toString();
};

const loadCategorySlugs = async () => {
    const raw = await fs.readFile(CATEGORIES_FILE, 'utf8');
    const data = JSON.parse(raw);

    const slugs = data
        .flatMap((group) => Array.isArray(group?.items) ? group.items : [])
        .map((item) => item?.category)
        .filter(Boolean);

    return [...new Set(slugs)];
};

const fetchCategoryProducts = async (category) => {
    const products = [];
    let skip = 0;
    let total = Number.POSITIVE_INFINITY;

    while (skip < total) {
        const url = buildApiUrl(`/products/category/${encodeURIComponent(category)}`, {
            limit: PRODUCTS_PER_REQUEST,
            skip,
        });

        const response = await fetch(url);

        if (!response.ok) {
            const message = await response.text().catch(() => response.statusText);
            throw new Error(`Failed to fetch "${category}" products: ${response.status} ${message}`);
        }

        const payload = await response.json();
        const batch = payload?.products ?? [];
        const nextTotal = typeof payload?.total === 'number' ? payload.total : total;
        const nextLimit = typeof payload?.limit === 'number' ? payload.limit : PRODUCTS_PER_REQUEST;

        products.push(...batch);

        if (batch.length === 0) {
            break;
        }

        skip += nextLimit || batch.length;
        total = Number.isFinite(nextTotal) ? nextTotal : skip;
    }

    return products;
};

const toCategoryPath = (category) => `/categories/${encodeURIComponent(category)}`;
const toProductPath = (product, fallbackCategory) => {
    const category = product?.category || fallbackCategory;
    if (!category || !product?.id) {
        return null;
    }

    return `/products/${product.id}`;
};

const buildUrlXml = ({ loc, lastmod, changefreq, priority }) => {
    return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${normalizeDate(lastmod)}</lastmod>`,
        changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
        priority ? `    <priority>${priority}</priority>` : null,
        '  </url>',
    ].filter(Boolean).join('\n');
};

async function generateSitemap() {
    console.info('Generating sitemap...');
    const categories = await loadCategorySlugs();

    if (categories.length === 0) {
        throw new Error(`No categories found in ${path.relative(process.cwd(), CATEGORIES_FILE)}`);
    }

    const urls = new Map();
    const trackedProductIds = new Set();

    STATIC_ROUTES.forEach((route) => addUrl(urls, route));

    for (const category of categories) {
        console.info(`Processing category "${category}"...`);
        const categoryPath = toCategoryPath(category);
        addUrl(urls, { path: categoryPath, priority: '0.8', changefreq: 'weekly' });

        const products = await fetchCategoryProducts(category);
        addPaginatedUrls(urls, {
            basePath: categoryPath,
            totalItems: products.length,
            priority: '0.7',
            changefreq: 'weekly',
        });

        products.forEach((product) => {
            if (product?.id) {
                trackedProductIds.add(product.id);
            }
        });

        for (const product of products) {
            const productPath = toProductPath(product, category);
            if (!productPath) {
                continue;
            }

            addUrl(urls, {
                path: productPath,
                priority: '0.5',
                changefreq: 'monthly',
                lastmod: product?.meta?.updatedAt || product?.updatedAt || product?.meta?.createdAt || nowIso,
            });
        }
    }

    addPaginatedUrls(urls, {
        basePath: '/',
        totalItems: trackedProductIds.size,
        priority: '0.9',
        changefreq: 'weekly',
    });

    const xmlBody = [...urls.values()]
        .map((url) => buildUrlXml(url))
        .join('\n');

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        xmlBody,
        '</urlset>',
        '',
    ].join('\n');

    await fs.writeFile(OUTPUT_FILE, xml, 'utf8');

    console.info(`Sitemap written to ${path.relative(process.cwd(), OUTPUT_FILE)} with ${urls.size} URLs.`);
}

generateSitemap().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
