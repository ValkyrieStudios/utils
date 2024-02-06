'use strict';

export default function isIntegerAboveOrEqual (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val >= ref;
}
