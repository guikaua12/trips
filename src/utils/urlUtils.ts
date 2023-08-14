export function objectToQueryParams(obj: object): string {
    const queryParams = Object.entries(obj)
        .filter(([, value]) => !!value)
        .map(([key, value]) => {
            if (value instanceof Date) {
                return `${key}=${encodeURIComponent(value.toISOString())}`;
            }

            return `${key}=${encodeURIComponent(value as string)}`;
        })
        .join('&');

    return queryParams ? `?${queryParams}` : '';
}
