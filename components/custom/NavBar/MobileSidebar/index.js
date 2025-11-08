import { X } from "lucide-react"

import NAVIGATION_CATEGORIES from '@/helpers/constants/categories.json';

import Category from '../NavList/MenuItem/Category';

const MobileSidebar = ({ open, onClose }) => (
    <>
        <button
            type="button"
            className={`fixed inset-0 z-40 bg-background/70 backdrop-blur transition-opacity duration-200 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={onClose}
            aria-label="Close menu backdrop"
        ></button>

        <nav
            className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] transform bg-background shadow-xl transition-transform duration-200 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-between border-b px-4 py-4">
                <p className="text-lg font-semibold">Browse categories</p>
                <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-foreground"
                    aria-label="Close menu"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
            <div className="h-[calc(100%-64px)] overflow-y-auto px-4 py-6">
                <ul className="space-y-6">
                    {NAVIGATION_CATEGORIES.map((section) => (
                        <li key={section.category}>
                            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                {section.category}
                            </p>
                            <div className="mt-2 space-y-1">
                                {section.items.map(item => (
                                    <Category
                                        key={item.category}
                                        category={item.category}
                                        label={item.label}
                                        icon={item.icon}
                                        onClick={onClose}
                                    />
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </>
)

export default MobileSidebar;
