import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { ShoppingCart } from "lucide-react"

const ICONS = Object.fromEntries(
    Object.entries(dynamicIconImports).map(([name, importer]) => [
        name,
        dynamic(importer, { ssr: false })
    ])
);

const DynamicIcon = ({ icon, className }) => {
    const Icon = ICONS[icon] || ShoppingCart;

    return (
        <Icon className={className} aria-hidden />
    );
}

export default DynamicIcon;
