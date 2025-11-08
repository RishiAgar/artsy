import Badge from "@/components/ui/badge";
import getPrice, { getDiscountedPrice } from "@/helpers/utils/getPrice";

import Cta from './Cta';

const ProductDetails = ({ product }) => {
    return (
        <>
            <div className="text-sm mb-3 font-semibold text-green-600">
                Special price
            </div>
            <div className="flex items-baseline gap-4">
                <span className="text-base md:text-2xl font-semibold">
                    {getPrice(getDiscountedPrice(product.price, product.discountPercentage))}
                </span>
                {product.price && (
                    <span className="text-lg text-destructive line-through">
                        {getPrice(product.price)}
                    </span>
                )}
            </div>

            <Badge
                variant="secondary"
                className="bg-green-200 hover:bg-green-200 mt-2"
            >
                {`You save bumper discount of ${product.discountPercentage}%`}
            </Badge>

            <div className="text-xs mt-1 font-light">
                Inclusive of all taxes
            </div>

            <Cta product={product} />
        </>
    );
}

export default ProductDetails;
