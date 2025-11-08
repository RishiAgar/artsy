import serverGet from '@/helpers/utils/serverGet';

export const revalidate = 300;

const DEFAULT_SKIP = 24;

const PAGE_URL = `${process.env.NEXT_PUBLIC_WEBSITE_ADDRESS}/products`;

export async function generateMetadata({ searchParams }) {
    const sp = await searchParams;

    const page = Number(sp?.page || 1);
    const category = sp?.category;

    const title = page > 1 ? `Artsy | ${category || "Products"} - Page ${page}` : `Artsy | ${category || "Products"}`;
    const canonical = page > 1 ? `${PAGE_URL}?page=${page}` : PAGE_URL;

    return {
        title,
        description: "Server-rendered products with crawlable pagination.",
        alternates: { canonical },
    };
}

export default async function ProductsPage({ searchParams }) {
    const sp = await searchParams;

    const page = Math.max(1, Number(sp?.page || 1));
    const limit = Math.max(1, Number(sp?.limit || DEFAULT_SKIP));
    const category = sp?.category;

    const skip = (page - 1) * limit;

    const data = await serverGet({
        path: "/products",
        params: {
            skip,
            limit,
            category,
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
        />
    );
}
