'use strict';

export default function isNumberAbove (val, ref) {
    return !Number.isFinite(val) || !Number.isFinite(ref) ? false : val > ref;
}
