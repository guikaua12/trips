export const preprocessUndefined = (value: any) => {
    if (typeof value == 'string' && !value.trim().length) return undefined;
    else if (typeof value == 'number' && isNaN(value)) return undefined;

    return value;
};
