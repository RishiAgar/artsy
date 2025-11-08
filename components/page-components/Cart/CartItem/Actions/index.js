import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Actions = ({ item, onUpdateQuantity, onRemove }) => {
    const product = item?.product;

    if (!product) {
        return null;
    }

    const quantity = Math.max(1, item.quantity || 1);
    const minQuantity = Math.max(0, product.minimumOrderQuantity);

    const quantityOptions = Array.from(
        { length: product.stock - minQuantity + 1},
        (_, index) => minQuantity + index,
    );

    const handleSelectChange = (value) => {
        const parsedValue = Number(value);

        if (!Number.isFinite(parsedValue) || parsedValue < 1) {
            return;
        }

        onUpdateQuantity(product.id, parsedValue);
    };

    const handleRemove = () => {
        onRemove(product.id);
        toast.success("Item has been removed from cart.");
    }

    return (
        <div className="flex items-center gap-4">
            <Select
                value={quantity.toString()}
                onValueChange={handleSelectChange}
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                    {quantityOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                            {`Quantity: ${option}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <button
                type="button"
                onClick={handleRemove}
                className="text-muted-foreground transition hover:text-destructive"
                aria-label="Remove item"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Actions;
