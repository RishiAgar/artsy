'use client';

import { useRouter } from 'next/navigation';

import EmptyState from '@/components/custom/EmptyState';

const NotFoundPage = () => {
    const router = useRouter();

    const goToProducts = () => {
        router.push('/');
    };

    return (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
            <div className="w-full max-w-3xl">
                <EmptyState
                    title="Page not found"
                    description="Discover the latest arrivals and timeless essentials curated by Artsy. Add pieces to your cart to see them here."
                    onClick={goToProducts}
                    label="Browse Collections"
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
