
import { useCallback } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const ShateCta = () => {
    const handleCopyLink = useCallback(async () => {
        if (typeof window === "undefined" || typeof navigator === "undefined") {
            return;
        }

        if (!navigator.clipboard?.writeText) {
            toast.warning("Copy unavailable on this device");
            return;
        }

        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link has succesfully copied to clipboard");
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleCopyLink}
            aria-label="Copy product link"
            title="Copy product link"
            className="h-10 w-10"
        >
            <Copy className="h-4 w-4" aria-hidden="true" />
        </Button>
    );
}

export default ShateCta;
