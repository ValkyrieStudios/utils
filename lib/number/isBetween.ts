/**
 * Check whether or not the provided value is a number between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param val - Value to verify
 * @param min - Lower boundary
 * @param max - Upper boundary
 *
 * @returns Whether or not the value is a number between min and max inclusive
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
