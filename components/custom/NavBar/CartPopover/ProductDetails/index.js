
import Image from "next/image";

import findByCategoryKey from "@/helpers/utils/findByCategoryKey";
import getPrice, { getDiscountedPrice } from "@/helpers/utils/getPrice";

const ProductDetails = ({ product, quantity }) => {
    const productPrice = getPrice(
        getDiscountedPrice(product.price, product.discountPercentage)
    );

    const category = findByCategoryKey(product.category)?.label || product.category;

    return (
        <div className="mt-4 flex gap-4">
            {
                product.thumbnail ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-muted">
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                    </div>
                ) : null
            }

            <div className="flex-1">
                <p className="text-base font-medium text-foreground">
                    {product.title}
                </p>
                <p className="text-sm text-gray-400 font-light my-1">
                    {product.description}
                </p>
                <p className="text-sm text-muted-foreground">
                    {`${product.brand} • ${category}`}
                </p>
                <p className="mt-4 text-lg font-semibold text-foreground">
                    {productPrice}
                </p>
                <p className="text-xs text-muted-foreground">
                    {`Quantity in cart: ${quantity}`}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
