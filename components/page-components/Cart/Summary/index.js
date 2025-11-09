import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import getPrice from "@/helpers/utils/getPrice";

const Summary = ({ subtotal = 0, actualSubTotal = 0, hasItems, onClearCart }) => {
    const discount = actualSubTotal - subtotal;

    const onCheckout = () => {
        window.alert("You have clicked checkout");
    }

    const handleClearCart = () => {
        if (!hasItems || typeof onClearCart !== "function") {
            return;
        }

        onClearCart();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold uppercase text-foreground">
                Order Summary
            </h2>

            <div className="space-y-3 text-sm tracking-wide text-muted-foreground">
                <div className="flex items-center justify-between">
                    Shipping
                    <span className="text-right">Calculated at checkout</span>
                </div>

                <div className="flex items-center justify-between text-base tracking-tight text-foreground">
                    <span className="font-semibold">Subtotal</span>
                    <span className="text-lg font-semibold">
                        {getPrice(subtotal)}
                    </span>
                </div>
            </div>

            {
                discount > 0 ? (
                    <div className="rounded border px-4 py-3 text-sm border-emerald-200 bg-emerald-50 text-emerald-900">
                        {`Congratulations! you have saved ${getPrice(discount)}`} 
                    </div>
                ) : null
            }

            <Button
                className="flex w-full items-center justify-center gap-2"
                size="lg"
                disabled={!hasItems}
                onClick={onCheckout}
            >
                <Lock className="h-4 w-4" />
                Checkout
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                disabled={!hasItems}
                className="w-full text-center text-xs font-semibold uppercase text-muted-foreground underline decoration-dotted underline-offset-4 transition hover:text-destructive disabled:cursor-not-allowed disabled:opacity-70"
            >
                Clear cart
            </Button>

            <p className="text-xs leading-relaxed text-muted-foreground">
                The price and availability of items at Artsy subject to change. The 
                shopping cart is a temporary place to store a list of your items and 
                reflects each item&apos;s most recent price.
            </p>
        </div>
    );
};

export default Summary;
