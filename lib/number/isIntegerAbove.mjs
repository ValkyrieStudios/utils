'use strict';

export default function isIntegerAbove (val, ref) {
    return !Number.isInteger(val) || !Number.isFinite(ref) ? false : val > ref;
}
