"use client";

import {
    useEffect,
    useState,
} from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
) {
    const [storedValue, setStoredValue] =
        useState(initialValue);

    useEffect(() => {
        const item = window.localStorage.getItem(key);

        if (item) {
            setStoredValue(
                JSON.parse(item)
        );
        }
    }, [key]);

    function setValue(value: T) {
        setStoredValue(value);
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }

    return [storedValue, setValue] as const;
}