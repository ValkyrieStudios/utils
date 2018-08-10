export function isNumber (val) {
    return (typeof val === 'number' || isNumericalNaN(val) || val instanceof Number);
}

export function isNumericalNaN (val) {
    return Number.isNaN(val);
}
