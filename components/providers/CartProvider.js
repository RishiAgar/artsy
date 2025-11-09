'use client';

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
    cartItems as CART_ITEMS_STORAGE_KEY,
} from "@/helpers/constants/localStorageKeys";
import { getValue, setValue } from "@/helpers/utils/localStorage";

const CartContext = createContext(undefined);

const DEFAULT_POPOVER_AUTO_CLOSE = 6000;

const normalizeCartItems = (items) => (Array.isArray(items) ? items : []);

const readStoredCartItems = () => normalizeCartItems(getValue(CART_ITEMS_STORAGE_KEY));

const persistCartItems = (items) => {
    setValue(CART_ITEMS_STORAGE_KEY, normalizeCartItems(items));
};

const CartProvider = ({ children }) => {
    const [items, setItemsState] = useState(readStoredCartItems);
    const [popoverState, setPopoverState] = useState({
        isOpen: false,
        data: null,
        updatedAt: 0,
        pathname: null,
    });
    const shouldPersistRef = useRef(false);
    const pathname = usePathname();

    const closeCartPopover = () => {
        setPopoverState((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
    };

    const openCartPopover = (payload) => {
        if (!payload || !payload.product) {
            return;
        }

        setPopoverState({
            isOpen: true,
            data: payload,
            updatedAt: Date.now(),
            pathname,
        });
    };

    useEffect(() => {
        if (!shouldPersistRef.current) {
            shouldPersistRef.current = true;
            return;
        }

        persistCartItems(items);
    }, [items]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const handleStorage = (event) => {
            if (event.key && event.key !== CART_ITEMS_STORAGE_KEY) {
                return;
            }

            try {
                const parsedItems = event.newValue ? JSON.parse(event.newValue) : [];

                shouldPersistRef.current = false;
                setItemsState(normalizeCartItems(parsedItems));
            } catch (error) {
                console.error("Failed to sync cart from storage event", error);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    const popoverIsVisible =
        Boolean(popoverState.isOpen) &&
        Boolean(pathname) &&
        popoverState.pathname === pathname;

    useEffect(() => {
        if (!popoverIsVisible || typeof window === "undefined") {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            setPopoverState((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
        }, DEFAULT_POPOVER_AUTO_CLOSE);

        return () => {
            window.clearTimeout(timer);
        };
    }, [popoverIsVisible, popoverState.updatedAt]);

    const setItems = (updater) => {
        shouldPersistRef.current = true;
        setItemsState((previousItems) => {
            const nextItems = typeof updater === "function" ? updater(previousItems) : updater;

            return normalizeCartItems(nextItems);
        });
    };

    const addItem = (product, quantity = 1) => {
        if (!product || typeof product.id === "undefined") {
            console.warn("Product needs an id to be added to the cart");
            return;
        }

        const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;

        setItems((currentItems) => {
            const existingItemIndex = currentItems.findIndex(
                (item) => item.product?.id === product.id
            );

            if (existingItemIndex >= 0) {
                return currentItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + safeQuantity }
                        : item
                );
            }

            const now = new Date().toISOString();

            return [
                ...currentItems,
                {
                    id: product.id,
                    product,
                    quantity: safeQuantity,
                    addedAt: now,
                },
            ];
        });
    };

    const updateItemQuantity = (productId, quantity) => {
        if (typeof productId === "undefined") {
            return;
        }

        const safeQuantity = Math.floor(quantity);

        if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
            setItems((items) => items.filter((item) => item.product?.id !== productId));
            return;
        }

        setItems((items) => items.map((item) => item.product?.id === productId ? {
            ...item,
            quantity: safeQuantity,
        } : item
        ));
    };

    const removeItem = (productId) => {
        if (typeof productId === "undefined") {
            return;
        }

        setItems((items) => items.filter((item) => item.product?.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartItemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

    const value = {
        cartItems: items,
        cartCount: cartItemCount,
        cartQuantityTotal: cartItemCount,
        cartItemCount,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        cartPopoverIsOpen: popoverIsVisible,
        cartPopoverData: popoverIsVisible ? popoverState.data : null,
        openCartPopover,
        closeCartPopover,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
};

export default CartProvider;
