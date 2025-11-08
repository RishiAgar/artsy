'use client';
import { useRouter } from 'next/navigation';

import EmptyState from '@/components/custom/EmptyState';
import { useCart } from "@/components/providers/CartProvider";
import { getDiscountedPrice } from "@/helpers/utils/getPrice";

import Summary from './Summary';
import CartItem from './CartItem';

const PageCart = () => {
    const router = useRouter();
    const { cartItems, cartItemCount, updateItemQuantity, removeItem, clearCart } = useCart();

    const subtotal = cartItems.reduce((total, item) => {
        const quantity = item.quantity;
        return total + getDiscountedPrice(item.product.price, item.product.discountPercentage) * quantity;
    }, 0);

    const actualSubTotal = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const hasItems = cartItemCount > 0;

    const browseCollections = () => {
        router.push('/products');
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 lg:pb-">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
                <section className="flex-1 lg:pr-6">
                    <h1 className="text-[2.25rem] mb-6 uppercase sm:text-[3rem]">
                        {`Your Cart (${cartItemCount})`}
                    </h1>

                    {hasItems ? null : (
                        <EmptyState
                            title="Your cart is empty"
                            description="Discover the latest arrivals and timeless essentials curated by Artsy. Add pieces to your cart to see them here."
                            onClick={browseCollections}
                            label="Browse Collections"
                        />
                    )}

                    <div className="divide-y">
                        {cartItems.map((item) => (
                            <CartItem
                                key={`${item?.product?.id ?? item.id}`}
                                item={item}
                                onUpdateQuantity={updateItemQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>
                </section>

                <div className="w-full lg:w-[360px] lg:flex-shrink-0 lg:self-start">
                    <aside className="rounded border bg-white p-6 shadow-xs lg:sticky lg:top-[73px]">
                        <Summary
                            hasItems={hasItems}
                            subtotal={subtotal}
                            actualSubTotal={actualSubTotal}
                            onClearCart={clearCart}
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PageCart;
