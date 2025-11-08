'use client';

import { ArrowRight } from "lucide-react"
import { useMemo, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import isProductInStock from "@/helpers/utils/isProductInStock";
import { useCart } from "@/components/providers/CartProvider";

const Cta = ({ product }) => {
    const totalStock = Math.max(0, product.stock || 0);
    const minQuantity = Math.max(1, product.minimumOrderQuantity || 1);

    const { addItem, cartItems, cartItemCount, openCartPopover } = useCart();

    const existingCartItem = cartItems.find(item => item.product?.id === product.id);
    const existingQuantity = existingCartItem?.quantity || 0;
    const remainingStock = Math.max(0, totalStock - existingQuantity);
 
    const canAddMore = isProductInStock(product.availabilityStatus, minQuantity, remainingStock);

    const [selectedQuantity, setSelectedQuantity] = useState(() => (canAddMore ? minQuantity : 0));

    const quantity = useMemo(() => {
        if (!canAddMore) {
            return 0;
        }

        if (!Number.isFinite(selectedQuantity) || selectedQuantity < minQuantity) {
            return minQuantity;
        }

        if (selectedQuantity > remainingStock) {
            return remainingStock;
        }

        return selectedQuantity;
    }, [canAddMore, minQuantity, remainingStock, selectedQuantity]);

    const dropdownList = useMemo(() => {
        if (!canAddMore) {
            return [];
        }

        const optionsCount = Math.max(0, remainingStock - minQuantity + 1);

        return Array.from({ length: optionsCount }, (_, i) => minQuantity + i);
    }, [canAddMore, minQuantity, remainingStock]);

    const handleClick = () => {
        if (!canAddMore) {
            return;
        }

        const cappedQuantity = Math.min(quantity, remainingStock);

        if (cappedQuantity < minQuantity) {
            return;
        }

        addItem(product, cappedQuantity);

        openCartPopover({
            product,
            quantityAdded: cappedQuantity,
            productQuantity: existingQuantity + cappedQuantity,
            cartCount: cartItemCount + cappedQuantity,
        });
    }

    const updateQuantity = val => {
        const parsedValue = Number(val);

        if (!Number.isFinite(parsedValue)) {
            return;
        }

        setSelectedQuantity(parsedValue);
    }

    return (
        <div className="mt-6 mb-12">
            <Select
                value={canAddMore ? quantity.toString() : undefined}
                onValueChange={updateQuantity}
                disabled={!canAddMore}
            >
                <SelectTrigger className="w-full mb-2">
                    <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                    {
                        dropdownList.map(item => (
                            <SelectItem
                                key={item}
                                value={item.toString()}
                            >
                                {`Quantity: ${item}`}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            {existingQuantity > 0 && remainingStock === 0 && (
                <p className="mb-3 text-sm text-destructive">
                    You already have the maximum quantity for this item in your cart.
                </p>
            )}

            <Button
                size="lg"
                className="w-full"
                onClick={handleClick}
                disabled={!canAddMore}
            >
                Add to Cart
                <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default Cta;
