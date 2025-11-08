"use client";

import Link from "next/link";
import { isEmpty } from "lodash";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/components/providers/CartProvider";

import Header from './Header';
import ProductDetails from './ProductDetails';

const CartPopover = () => {
    const {
        cartItemCount,
        cartPopoverIsOpen,
        cartPopoverData,
        closeCartPopover,
    } = useCart();

    const product = cartPopoverData?.product;

    const handleOpenChange = (nextOpen) => {
        if (!nextOpen) {
            closeCartPopover();
        }
    };

    if (isEmpty(product)) {
        return null;
    }

    return (
        <Dialog open={cartPopoverIsOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                aria-label="Cart updated"
                hideCloseButton
                overlayClassName="bg-black/30"
                className="w-full max-w-[360px] !left-auto !right-4 !top-[88px] !translate-x-0 !translate-y-0 rounded-2xl border border-border bg-white p-5 shadow-2xl data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2"
            >
                <Header onClose={closeCartPopover} />

                <ProductDetails product={product} quantity={cartPopoverData.productQuantity} />

                <Button
                    asChild
                    variant="outline"
                    className="w-full mt-2"
                >
                    <Link href="/cart" onClick={closeCartPopover}>
                        {`View Cart (${cartItemCount})`}
                    </Link>
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CartPopover;
