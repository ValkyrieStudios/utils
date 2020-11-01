'use strict';

import fnv1A from '../hash/fnv1A';

export default function (val = []) {
    const seen = {};
    return val.filter((item) => {
        const hash = fnv1A(item);
        return (Object.prototype.hasOwnProperty.call(seen, hash)) ? false : (seen[hash] = true);
    });
}
