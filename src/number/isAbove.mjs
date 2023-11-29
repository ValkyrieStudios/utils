'use strict';

//  Check if a number is above a reference number
export default function isNumberAbove (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val > ref;
}
