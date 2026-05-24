export function trackEvent(
    event: string,
    properties?: Record<
        string,
        unknown
  >
) {
    console.log(
        "[analytics]",
        event,
        properties
    );
}