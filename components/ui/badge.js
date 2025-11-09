'use client';

import { cn } from "@/packages/lib/utils";

import { badgeVariants } from '../ui-types/badge-variants';

const Badge = ({
    className,
    variant,
    ...props
}) => {
    return (
        <div
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export default Badge;
