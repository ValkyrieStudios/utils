import {toString} from './utils';
export const FNV_32 = 2166136261;
export const FNV_64 = 1099511628211n;

/**
 * Convert a provided value into a Fowler-Noll-Vo 1A hash
 * For more info: https://tools.ietf.org/html/draft-eastlake-fnv-03
 *
 * @param {unknown} data - Value to be converted
 * @param {number} offset - (default=2166136261) FNV prime to use
 */
function fnv1A (data:unknown, offset:number = FNV_32):number {
    let hash = offset;
    const normalized = toString(data);

    //  Calculate the hash of the normalized data by looping over each char
    const len = normalized.length;
    for (let i = 0; i < len; i++) {
        hash ^= normalized.charCodeAt(i);

        /**
         * 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
         * Using bitshift for accuracy and performance. Numbers in JS suck
         */
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    return hash >>> 0;
}

export {fnv1A, fnv1A as default};
