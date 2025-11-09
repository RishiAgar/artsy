'use client';

import { useRouter } from 'next/navigation';

import EmptyState from "@/components/custom/EmptyState";

const NoProducts = ({ total }) => {
    const router = useRouter();

    const browseCollections = () => {
        router.push('/');
    }

    if (total > 0) {
        return null;
    }

    return (
                        
        <EmptyState
            title="No Products are currently Present"
            description="Discover the latest arrivals and timeless essentials curated by Artsy. Add pieces to your cart to see them here."
            onClick={browseCollections}
            label="Browse Collections"
        />
                
    );
}

export default NoProducts;
