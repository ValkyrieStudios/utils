'use strict';

//  Check if a number is below a reference number
export default function isNumberBelow (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val < ref;
}
