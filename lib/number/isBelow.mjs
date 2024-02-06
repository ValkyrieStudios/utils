'use strict';

export default function isNumberBelow (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val < ref;
}
