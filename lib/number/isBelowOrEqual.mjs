'use strict';

export default function isNumberBelowOrEqual (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val <= ref;
}
