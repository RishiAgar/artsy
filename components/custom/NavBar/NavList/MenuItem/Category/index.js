
import Link from "next/link"

import DynamicIcon from '@/components/custom/DynamicIcon';

const Category = ({ icon, category, label, onClick = () => {} }) => (
    <Link
        href={`/categories/${category}`}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm capitalize transition-colors hover:bg-accent hover:text-accent-foreground"
        onClick={onClick}
    >
        <DynamicIcon
            icon={icon}
            className="h-4 w-4 text-muted-foreground"
        />
        {label}
    </Link>
);

export default Category;
