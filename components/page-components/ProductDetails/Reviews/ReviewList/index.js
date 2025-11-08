import { Circle } from "lucide-react";
import { isEmpty } from "lodash";

import maskEmail from '@/helpers/utils/maskEmail';
import RatingBadge from "@/components/custom/RatingBadge";
import getRelativeTimeFromNow from "@/helpers/utils/getRelativeTimeFromNow";

const ReviewList = ({ reviews }) => {
    return (
        <>
            {reviews.map(review => {
                return isEmpty(review) ? null : (
                    <article
                        key={`${review.reviewerEmail}-${review.comment}`}
                        className="rounded-2xl border border-border bg-white/95 p-6 shadow-xs dark:bg-card"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <RatingBadge rating={review?.rating || 0} />

                            <h3 className="font-semibold text-sm text-gray-900">
                                {review.reviewerName}
                            </h3>
                        </div>

                        {review?.comment && (
                            <p className="mt-3 text-sm text-gray-600">
                                {review.comment}
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="font-medium text-gray-700">
                                {review.reviewerEmail ? maskEmail(review.reviewerEmail) || 'Verified Buyer' : "Verified Buyer"}
                            </span>
                            <Circle
                                aria-hidden="true"
                                className="h-1.5 w-1.5 text-gray-500"
                                fill="currentColor"
                                strokeWidth={0}
                            />
                            <span>{getRelativeTimeFromNow(review.date)}</span>
                        </div>
                    </article>
                );
            })}
        </>
    );
};

export default ReviewList;
