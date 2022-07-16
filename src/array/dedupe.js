'use strict';

import fnv1A from '../hash/fnv1A';

export default function (val = []) {
    const seen = {};
    return val.filter(item => {
        //  Calculate hash for item
        const hash = fnv1A(item);

        //  If hash is already seen, filter out
        if (Object.prototype.hasOwnProperty.call(seen, hash)) return false;

        //  Set seen hash to true
        seen[hash] = true;

        //  Return true as this was the first occurrence
        return true;
    });
}
