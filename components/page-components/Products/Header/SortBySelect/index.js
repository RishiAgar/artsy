'use client';

import { useRouter } from 'next/navigation';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SORT_LIST = [
    { label: "Title: A to Z", value: "title::asc" },
    { label: "Title: Z to A", value: "title::desc" },
    { label: "Price: Low to High", value: "price::asc" },
    { label: "Price: High to Low", value: "price::desc" },
];

const SortBySelect = () => {
    const router = useRouter();

    const handleSortBy = value => {
        const [ sortBy, order ] = value.split("::");

        router.push(`/products?sortBy=${sortBy}&order=${order}`);
    }

    return (
        <Select onValueChange={handleSortBy}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                {
                    SORT_LIST.map(item => (
                        <SelectItem
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    );
}

export default SortBySelect;
