'use strict';

export default function isIntegerBelowOrEqual (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val <= ref;
}
