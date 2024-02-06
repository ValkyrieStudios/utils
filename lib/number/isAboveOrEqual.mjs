'use strict';

export default function isNumberAboveOrEqual (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val >= ref;
}
