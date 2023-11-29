'use strict';

//  Check if a number is an integer above or equal to a reference number
export default function isIntegerAboveOrEqual (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val >= ref;
}
