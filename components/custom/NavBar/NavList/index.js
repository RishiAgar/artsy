"use client";

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuIndicator,
} from '@/components/ui/navigation-menu';

import MenuItem from './MenuItem';
import NAVIGATION_CATEGORIES from '@/helpers/constants/categories.json';

const NavList = () => (
    <NavigationMenu withViewport={false} className="hidden flex-1 justify-center lg:flex">
        <NavigationMenuList className="space-x-0">
            {NAVIGATION_CATEGORIES.map(({ category, items }) => (
                <MenuItem
                    key={category}
                    label={category}
                    items={items}
                />
            ))}
        </NavigationMenuList>

        <NavigationMenuIndicator className="bg-transparent" />
    </NavigationMenu>
);

export default NavList;
