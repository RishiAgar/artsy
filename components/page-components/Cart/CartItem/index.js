import Image from "next/image";
import Link from "next/link";

import getPrice, { getDiscountedPrice } from "@/helpers/utils/getPrice";

import Actions from './Actions';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const product = item?.product;

    if (!product) {
        return null;
    }

    const priceTotal = item.quantity * getDiscountedPrice(
        product.price,
        product.discountPercentage
    );

    return (
        <div className="flex py-8 flex-row items-start gap-6">
            <div className="relative overflow-hidden rounded border bg-muted h-32 w-32">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                />
            </div>

            <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start">
                    <div className="flex-1">
                        <Link
                            href={`/products/${product.category}/${product.id}`}
                            className="text-lg font-medium text-foreground transition hover:text-orange-500"
                        >
                            {product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            {product.brand}
                        </p>
                    </div>

                    <p className="text-lg font-semibold text-foreground">
                        {getPrice(priceTotal)}
                    </p>
                </div>

                <Actions item={item} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
            </div>
        </div>
    );
};

export default CartItem;
