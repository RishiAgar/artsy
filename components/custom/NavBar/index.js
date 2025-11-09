"use client";

import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic";
import { Menu, ShoppingCart } from "lucide-react"

import NavList from "./NavList"
import CartPopover from "./CartPopover";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";

const MobileSidebar = dynamic(() => import('./MobileSidebar'), { ssr: false });

const NavBar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const { cartItemCount } = useCart()
    const displayCartCount = cartItemCount > 99 ? "99+" : cartItemCount

    const closeMobile = () => setIsMobileOpen(false)

    return (
        <>
            <header
                className="fixed left-0 right-0 top-0 z-50 w-full border-b bg-white"
            >
                <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full border text-foreground transition hover:bg-accent hover:text-accent-foreground lg:hidden"
                            aria-label="Open menu"
                            aria-expanded={isMobileOpen}
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <Link href="/" className="text-xl font-semibold tracking-tight">
                            Artsy
                        </Link>
                    </div>

                    <NavList />

                    <div className="ml-auto flex items-center">
                        <div className="relative">
                            <Link
                                href="/cart"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-foreground transition hover:bg-accent hover:text-accent-foreground relative"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                                        {displayCartCount}
                                    </span>
                                )}
                                <span className="sr-only">View cart</span>
                            </Link>

                            <CartPopover />
                        </div>
                    </div>
                </div>
            </header>

            <MobileSidebar open={isMobileOpen} onClose={closeMobile} />
        </>
    )
}

export default NavBar
