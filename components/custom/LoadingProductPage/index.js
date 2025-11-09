const shimmer = "animate-pulse rounded-md bg-muted";

const SkeletonCard = () => (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card">
        <div className="aspect-square w-full animate-pulse bg-muted" />

        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
            <div className={`${shimmer} h-3 w-1/3 rounded-full`} />

            <div className="space-y-2">
                <div className={`${shimmer} h-4 w-full`} />
                <div className={`${shimmer} h-4 w-5/6`} />
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-4">
                <div className={`${shimmer} h-5 w-24`} />
                <div className={`${shimmer} h-4 w-16 rounded-full`} />
            </div>
        </div>
    </div>
);

export default function LoadingProductPage() {
    const items = Array.from({ length: 8 });

    return (
        <div className="mx-auto w-full max-w-[1280px] px-6 py-12 md:px-10">
            <div className="mb-12 space-y-4">
                <div className={`${shimmer} h-12 w-64`} />

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className={`${shimmer} h-6 w-56 rounded-full`} />
                    <div className={`${shimmer} h-10 w-48 rounded-lg`} />
                </div>
            </div>

            <div className="grid gap-8 mb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>

            <div className="flex justify-center gap-3">
                <div className={`${shimmer} h-10 w-10 rounded-full`} />
                <div className={`${shimmer} h-10 w-16 rounded-lg`} />
                <div className={`${shimmer} h-10 w-10 rounded-full`} />
            </div>
        </div>
    );
}
