export function saveToStorage(
    key: string,
    value: unknown
) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}