'use client';

import { Button } from "@/components/ui/button";

const EmptyState = ({ title, description, onClick, label }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded border border-dashed bg-white py-16 text-center">
            <p className="text-xl font-semibold uppercase tracking-[0.3em] text-foreground">
                {title}
            </p>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
                {description}
            </p>
            <Button variant="outline" size="lg" className="mt-8 px-10" onClick={onClick}>
                {label}
            </Button>
        </div>
    );
};

export default EmptyState;
