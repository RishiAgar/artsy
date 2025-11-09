import { notFound } from 'next/navigation';

import serverGet from '@/helpers/utils/serverGet';

export const revalidate = 300;

const PAGE_URL = `${process.env.NEXT_PUBLIC_WEBSITE_ADDRESS}/products`;

const getProduct = async id => {
    try {
        const data = await serverGet({
            path: `/products/${id}`,
            options: {
                next: {
                    revalidate: 300,
                    tags: [`product-${id}`, "products"],
                },
            },
        });
        return data;
    } catch (e) {
        return null;
    }
};

export async function generateMetadata({ params }) {
    const p = await params;
    const product = await getProduct(p.id);

    const canonical = `${PAGE_URL}/${p.id}`;

    const title = product?.title ? `${product.title} | Artsy` : 'Product | Artsy';
    const description = product?.description || `All products sold by Artsy for product`;

    return {
        title,
        description,
        alternates: { canonical },
    };
}

export default async function ProductDetailsPage({ params }) {
    const p = await params;

    const id = p?.id;

    const data = await getProduct(id);

    if (!data?.id) {
        notFound();
    }

    const ProductDetails = (await import("@/components/page-components/ProductDetails")).default;

    return (
        <ProductDetails
            product={data}
        />
    );
}
