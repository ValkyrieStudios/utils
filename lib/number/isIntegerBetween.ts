/**
 * Check whether or not the provided value is an integer between a min and max
 * inclusive of min and max
 * equal to another value
 *
 * @param {unknown} val - Value to verify
 * @param {number} min - Lower boundary
 * @param {number} max - Upper boundary
 */
function isIntegerBetween (
    val:unknown,
    min:number,
    max:number
):val is number {
    return (
        Number.isInteger(val) &&
        Number.isFinite(min) &&
        Number.isFinite(max) &&
        ((val as number) >= min && (val as number) <= max)
    );
}

export {isIntegerBetween, isIntegerBetween as default};
