
import { Share2 } from "lucide-react"
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const ShateCta = ({ title, description }) => {
    const handleShare = async () => {
        if (typeof window === "undefined" || typeof navigator === "undefined") {
            return;
        }

        const payload = {
            title: title,
            text: description,
            url: window.location.href,
        };

        if (typeof navigator.share === "function") {
            try {
                await navigator.share(payload);
            } catch (error) {
                if (error?.name !== "AbortError") {
                    toast.warning("Unable to share");
                }
            }
            return;
        }

        if (!navigator.clipboard?.writeText) {
            toast.warning("Share unavailable on this device");
            return;
        }

        try {
            await navigator.clipboard.writeText(payload.url);
            toast.warning("Share not supported, link copied instead");
        } catch (e) {
            toast.warning("Share unavailable on this device");
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            aria-label="Share product"
            title="Share product"
            className="h-10 w-10"
        >
            <Share2 className="h-4 w-4" aria-hidden="true" />
        </Button>
    );
}

export default ShateCta;
