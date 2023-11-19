'use strict';

//  Check if a number is above or equal to a reference number
export default function isNumberAboveOrEqual (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val >= ref;
}
