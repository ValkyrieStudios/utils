/**
 * Check whether or not the provided value is a number between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param {unknown} val - Value to verify
 * @param {number} min - Lower boundary
 * @param {number} max - Upper boundary
 */
function isNumberBetween (val:unknown, min:number, max:number):val is number {
    if (
        !Number.isFinite(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
    ) return false;

    return (val as number) >= min && (val as number) <= max;
}

export {isNumberBetween, isNumberBetween as default};
