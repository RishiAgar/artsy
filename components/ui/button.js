"use client";

import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/packages/lib/utils";
import { buttonVariants } from "../ui-types/button-variants";

const Button = ({
    className,
    variant,
    size,
    asChild = false,
    ...props
}) => {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export {
    Button,
    buttonVariants,
};
