'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
    cartItems as CART_ITEMS_STORAGE_KEY,
    cartLastUpdated as CART_LAST_UPDATED_KEY,
} from "@/helpers/constants/localStorageKeys";
import { getValue, removeValue, setValue } from "@/helpers/utils/localStorage";

const CartContext = createContext(undefined);

const DEFAULT_POPOVER_AUTO_CLOSE = 6000000;

const getInitialCartState = () => {
    const storedItems = getValue(CART_ITEMS_STORAGE_KEY);
    const safeItems = Array.isArray(storedItems) ? storedItems : [];

    return {
        items: safeItems,
        lastUpdated: getValue(CART_LAST_UPDATED_KEY),
    };
};

const createEmptyCartState = () => ({
    items: [],
    lastUpdated: null,
});

const CartProvider = ({ children }) => {
    const [state, setState] = useState(createEmptyCartState);
    const [popoverState, setPopoverState] = useState({
        isOpen: false,
        data: null,
        updatedAt: 0,
    });
    const shouldPersistRef = useRef(false);
    const pathname = usePathname();

    const closeCartPopover = useCallback(() => {
        setPopoverState((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
    }, []);

    const openCartPopover = useCallback((payload) => {
        if (!payload || !payload.product) {
            return;
        }

        setPopoverState({
            isOpen: true,
            data: payload,
            updatedAt: Date.now(),
        });
    }, []);

    const persistState = useCallback((items, lastUpdated) => {
        setValue(CART_ITEMS_STORAGE_KEY, Array.isArray(items) ? items : []);

        if (lastUpdated) {
            setValue(CART_LAST_UPDATED_KEY, lastUpdated);
        } else {
            removeValue(CART_LAST_UPDATED_KEY);
        }
    }, []);

    useEffect(() => {
        if (!shouldPersistRef.current) {
            shouldPersistRef.current = true;
            return;
        }

        persistState(state.items, state.lastUpdated);
    }, [persistState, state.items, state.lastUpdated]);

    useEffect(() => {
        const storedState = getInitialCartState();
        const hasStoredItems = Array.isArray(storedState.items) && storedState.items.length > 0;
        const hasStoredTimestamp = Boolean(storedState.lastUpdated);

        if (!hasStoredItems && !hasStoredTimestamp) {
            return;
        }

        shouldPersistRef.current = false;
        setState({
            items: Array.isArray(storedState.items) ? storedState.items : [],
            lastUpdated: storedState.lastUpdated ?? null,
        });
    }, []);

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
                setState({
                    items: Array.isArray(parsedItems) ? parsedItems : [],
                    lastUpdated: getValue(CART_LAST_UPDATED_KEY),
                });
            } catch (error) {
                console.error("Failed to sync cart from storage event", error);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    useEffect(() => {
        if (!popoverState.isOpen || typeof window === "undefined") {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            closeCartPopover();
        }, DEFAULT_POPOVER_AUTO_CLOSE);

        return () => {
            window.clearTimeout(timer);
        };
    }, [closeCartPopover, popoverState.isOpen, popoverState.updatedAt]);

    useEffect(() => {
        if (!pathname) {
            return;
        }

        closeCartPopover();
    }, [closeCartPopover, pathname]);

    const setItems = useCallback((updater) => {
        shouldPersistRef.current = true;
        setState((prevState) => {
            const previousItems = prevState.items;
            const nextItems = typeof updater === "function" ? updater(previousItems) : updater;
            const nextTimestamp = new Date().toISOString();
            const normalizedItems = Array.isArray(nextItems) ? nextItems : [];

            return {
                items: normalizedItems,
                lastUpdated: nextTimestamp,
            };
        });
    }, []);

    const addItem = useCallback((product, quantity = 1) => {
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
    }, [setItems]);

    const updateItemQuantity = useCallback((productId, quantity) => {
        if (typeof productId === "undefined") {
            return;
        }

        const safeQuantity = Math.floor(quantity);

        if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
            setItems((items) => items.filter((item) => item.product?.id !== productId));
            return;
        }

        setItems((items) =>
            items.map((item) =>
                item.product?.id === productId
                    ? {
                        ...item,
                        quantity: safeQuantity,
                    }
                    : item
            )
        );
    }, [setItems]);

    const removeItem = useCallback((productId) => {
        if (typeof productId === "undefined") {
            return;
        }

        setItems((items) => items.filter((item) => item.product?.id !== productId));
    }, [setItems]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, [setItems]);

    const cartQuantityTotal = useMemo(() => {
        return state.items.reduce((total, item) => total + (item.quantity || 0), 0);
    }, [state.items]);

    const cartItemCount = useMemo(() => {
        return state.items.reduce((total, item) => total + (item.quantity || 0), 0)
    }, [state.items]);

    const value = useMemo(() => ({
        cartItems: state.items,
        cartCount: cartQuantityTotal,
        cartQuantityTotal,
        cartItemCount,
        lastUpdated: state.lastUpdated,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        cartPopoverIsOpen: popoverState.isOpen,
        cartPopoverData: popoverState.data,
        openCartPopover,
        closeCartPopover,
    }), [
        addItem,
        cartItemCount,
        cartQuantityTotal,
        clearCart,
        closeCartPopover,
        openCartPopover,
        popoverState.data,
        popoverState.isOpen,
        removeItem,
        state.items,
        state.lastUpdated,
        updateItemQuantity,
    ]);

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
