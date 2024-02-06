'use strict';

export default function isNumberBetween (val, min, max) {
    if (
        !Number.isFinite(val) ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
    ) return false;

    return val >= min && val <= max;
}
