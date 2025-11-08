import {
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import Category from "./Category";

const MenuItem = ({ label, items }) => (
    <NavigationMenuItem className="relative">
        <NavigationMenuTrigger>{label}</NavigationMenuTrigger>

        <NavigationMenuContent>
            <ul className="grid gap-1 p-4 md:w-[320px]">
                {items.map(item => (
                    <li key={item.category}>
                        <NavigationMenuLink asChild>
                            <Category
                                icon={item.icon}
                                category={item.category}
                                label={item.label}
                            />
                        </NavigationMenuLink>
                    </li>
                ))}
            </ul>
        </NavigationMenuContent>
    </NavigationMenuItem>
)

export default MenuItem;
