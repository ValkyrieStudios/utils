'use strict';

//  Check if a number is an integer below a reference number
export default function isIntegerBelow (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val < ref;
}
