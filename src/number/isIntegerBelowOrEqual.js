'use strict';

//  Check if a number is an integer below or equal to a reference number
export default function isIntegerBelowOrEqual (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val <= ref;
}
