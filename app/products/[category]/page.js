import serverGet from '@/helpers/utils/serverGet';
import findByCategoryKey from '@/helpers/utils/findByCategoryKey';
import { isEmpty } from 'lodash';
import { notFound } from 'next/navigation';

export const revalidate = 300;

const DEFAULT_SKIP = 24;

const PAGE_URL = `${process.env.NEXT_PUBLIC_WEBSITE_ADDRESS}/products`;

export async function generateMetadata({ searchParams, params }) {
    const sp = await searchParams;
    const p = await params;

    const page = Number(sp?.page || 1);

    const label = findByCategoryKey(p?.category)?.label || 'Products';

    const title = page > 1 ? `Artsy | ${label} - Page ${page}` : `Artsy | ${label}`;
    const baseCanonical = `${PAGE_URL}/${p?.category}`;
    const canonical = page > 1 ? `${baseCanonical}?page=${page}` : baseCanonical;

    return {
        title,
        description: `All products sold by Artsy for category ${label}`,
        alternates: { canonical },
    };
}

export default async function CagegoriesPage({ searchParams, params }) {
    const sp = await searchParams;
    const p = await params;

    const page = Math.max(1, Number(sp?.page || 1));
    const limit = Math.max(1, Number(sp?.limit || DEFAULT_SKIP));
    const category = p?.category;

    const sortBy = sp?.sortBy;
    const order = sp?.order;

    const skip = (page - 1) * limit;

    const categoryObj = findByCategoryKey(p?.category);

    if (isEmpty(categoryObj)) {
        notFound();
    }

    const data = await serverGet({
        path: `/products/category/${category}`,
        params: {
            skip,
            limit,
            category,
            sortBy,
            order,
        },
        options: {
            next: {
                revalidate: 300,
                tags: [`category-${category}`, "products"],
            },
        },
    });

    const { products = [], total = 0 } = data;

    const Products = (await import("@/components/page-components/Products")).default;

    return (
        <Products
            products={products}
            total={total}
            page={page}
            limit={DEFAULT_SKIP}
            category={categoryObj}
        />
    );
}
