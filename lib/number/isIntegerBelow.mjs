'use strict';

export default function isIntegerBelow (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val < ref;
}
