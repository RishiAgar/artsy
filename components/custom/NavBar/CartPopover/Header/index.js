import { CheckCircle2, X } from "lucide-react";

import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Header = ({ onClose }) => {
    return (
        <DialogTitle>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Added to Cart</span>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full border p-1 text-gray-500 transition hover:text-gray-900 hover:border-gray-900"
                    aria-label="Close cart update dialog"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </DialogTitle>
    );
};

export default Header;
