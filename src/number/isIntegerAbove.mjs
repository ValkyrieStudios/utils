'use strict';

//  Check if a number is an integer above a reference number
export default function isIntegerAbove (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val > ref;
}
