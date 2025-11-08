import Badge from "@/components/ui/badge";

import ShareCta from './ShareCta';
import RatingBadge from "@/components/custom/RatingBadge";

const ProductMainDetails = ({ product }) => {
    return (
        <>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className="mb-1 text-orange-500 text-md font-bold">
                        {product.brand}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
                        {product.title}
                    </h1>
                </div>

                <ShareCta title={product.title} description={product.description} />
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
                <RatingBadge rating={product?.rating || 0} />

                {
                    (product.tags || []).map(tag => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-blue-500 text-white hover:bg-blue-500 dark:bg-blue-600 uppercase"
                        >
                            {tag}
                        </Badge>
                    ))
                }
            </div>

            <p className="mt-5 text-gray-500">
                {product.description}
            </p>
        </>
    );
}

export default ProductMainDetails;
