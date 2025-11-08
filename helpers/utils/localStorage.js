const getValue = key => {
    if (typeof window === "undefined" || !window.localStorage) {
        return null;
    }

    try {
        const stored = window.localStorage.getItem(key);
        if (stored === null) {
            return null;
        }

        try {
            return JSON.parse(stored);
        } catch (e) {
            return stored;
        }
    } catch (e) {
        return null;
    }
}

const setValue = (key, value) => {
    if (typeof window === "undefined") {
        return false;
    }

    try {
        const isPrimitive = typeof value === "string" || typeof value === "number" || typeof value === "boolean";
        const toStore = isPrimitive ? String(value) : JSON.stringify(value);
        window.localStorage.setItem(key, toStore);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}

const removeValue = key => {
    if (typeof window === "undefined") {
        return false;
    }

    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}

export {
    setValue,
    getValue,
    removeValue,
}
