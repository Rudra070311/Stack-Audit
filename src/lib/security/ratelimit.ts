const requests = new Map<
    string,
    number
>();

export function rateLimit(
    ip: string
) {
    const current = requests.get(ip) || 0;
    requests.set(ip, current + 1);
    return current < 30;
}