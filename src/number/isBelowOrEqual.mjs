'use strict';

//  Check if a number is below or equal to a reference number
export default function isNumberBelowOrEqual (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val <= ref;
}
