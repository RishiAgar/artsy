import { Star } from "lucide-react"

import Badge from "@/components/ui/badge";

const RATING_SEVERITY_STYLES = {
    high: "bg-green-600 text-white hover:bg-green-600",
    medium: "bg-yellow-400 text-gray-900 hover:bg-yellow-400",
    low: "bg-red-500 text-white hover:bg-red-500",
};

const getRatingSeverity = (value) => {
    if (value >= 4) {
        return "high";
    }

    if (value >= 3) {
        return "medium";
    }

    return "low";
};

const RatingBadge = ({ rating = 0 }) => {
    const ratingSeverityClass = RATING_SEVERITY_STYLES[getRatingSeverity(rating)];

    return (
        <Badge
            variant="secondary"
            className={`gap-1 px-2 ${ratingSeverityClass} uppercase`}
        >
            <Star className="h-3 w-3" strokeWidth={0} fill="currentColor" />
            {rating.toFixed(1)}
        </Badge>
    );
}

export default RatingBadge;
