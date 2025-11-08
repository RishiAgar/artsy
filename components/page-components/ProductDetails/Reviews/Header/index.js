import { Star } from "lucide-react";

import getPlural from "@/helpers/utils/getPlural";

const STAR_LEVELS = [5, 4, 3, 2, 1];
const STAR_COLORS = {
    5: "bg-green-600",
    4: "bg-green-400",
    3: "bg-yellow-400",
    2: "bg-orange-400",
    1: "bg-red-500",
};

const Header = ({ product }) => {
    const reviews = Array.isArray(product?.reviews) ? product.reviews : [];
    const ratingValue = Number(product?.rating ?? 0);
    const ratingText = ratingValue ? ratingValue.toFixed(1) : "0.0";

    const ratingCounts = STAR_LEVELS.reduce((acc, level) => {
        const count = reviews.filter((review) => {
            const safeRating = Math.round(Number(review?.rating ?? 0));
            return safeRating === level;
        }).length;

        acc[level] = count;
        return acc;
    }, {});

    const highestCount = Math.max(
        ...STAR_LEVELS.map((level) => ratingCounts[level]),
        1
    );

    return (
        <>
            <h2 className="text-xl font-semibold text-gray-900">
                Ratings & Reviews
            </h2>
            <p className="text-sm text-gray-500">
                Hear from real shoppers about {product?.title || "this product"}.
            </p>

            <div className="mt-6 grid gap-8 rounded-2xl border border-border bg-white/90 p-6 shadow-xs dark:bg-card md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex items-baseline gap-1 text-5xl font-semibold text-gray-900">
                        {ratingText}
                        <Star
                            className="h-10 w-10 text-green-600"
                            strokeWidth={0}
                            fill="currentColor"
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {reviews.length ? `${getPlural(reviews.length, "Rating", 's')}` : "Not rated yet"}
                    </p>
                </div>

                <div className="space-y-3">
                    {STAR_LEVELS.map((level) => {
                        const currentCount = ratingCounts[level];
                        const barWidth = highestCount
                            ? Math.round((currentCount / highestCount) * 100)
                            : 0;

                        return (
                            <div
                                key={level}
                                className="flex items-center gap-3 text-sm text-gray-600"
                            >
                                <div className="flex w-10 items-center gap-0.5 font-semibold text-gray-700">
                                    {level}
                                    <Star
                                        className="h-3.5 w-3.5 text-gray-400"
                                        strokeWidth={0}
                                        fill="currentColor"
                                    />
                                </div>
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className={`h-full ${STAR_COLORS[level]}`}
                                        style={{ width: `${barWidth}%` }}
                                    />
                                </div>
                                <div className="w-8 text-right text-xs text-gray-500">
                                    {currentCount}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Header;
