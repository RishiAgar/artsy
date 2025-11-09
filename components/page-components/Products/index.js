import Pagination from "@/components/ui/pagination";

import Header from './Header';
import NoProducts from './NoProducts';
import ProductList from './ProductList';

const Products = ({ products, total, page, limit, category = {} }) => {
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return (
        <div className="mx-auto max-w-[1280px] px-6 py-12">
            <Header
                title={category.label || "All Artsy Products"}
                total={total}
            />

            <NoProducts total={total} />

            <ProductList products={products} />

            <Pagination
                page={page}
                totalPages={totalPages}
                hideSinglePage
                className="mt-4"
            />
        </div>
    );
}

export default Products;
