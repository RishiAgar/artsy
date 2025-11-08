import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import RatingBadge from "@/components/custom/RatingBadge";
import getPrice, { getDiscountedPrice } from "@/helpers/utils/getPrice";

const ProductList = ({ products }) => {
    return (
        <div className="grid gap-8 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                products.map(product => (
                    <Link
                        key={product.id}
                        href={`/products/${product.category}/${product.id}`}
                    >
                        <Card
                            className="group flex flex-col overflow-hidden border border-border/70 hover:border-primary/60 hover:shadow-md transition-all"
                        >
                            <CardHeader className="p-0">
                                <div className="relative aspect-[1/1] w-full overflow-hidden bg-muted">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </CardHeader>

                            <CardContent className="flex flex-1 flex-col gap-1.5 p-3 md:p-4">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    {product.category}
                                </p>
                                <h2 className="line-clamp-2 hover:text-orange-400 text-sm md:text-base font-medium leading-snug">
                                    {product.title}
                                </h2>

                                <div className="mt-1 flex items-baseline gap-2">
                                    <span className="text-base md:text-xl font-semibold">
                                        {getPrice(getDiscountedPrice(product.price, product.discountPercentage))}
                                    </span>
                                    {product.price && (
                                        <span className="text-xs text-destructive line-through">
                                            {getPrice(product.price)}
                                        </span>
                                    )}
                                </div>
                                
                                <div>
                                    <RatingBadge rating={product?.rating || 0} />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))
            }
        </div>
    );
};

export default ProductList;
