import {toString} from './utils';
export const FNV_32 = 2166136261;
export const FNV_64 = 1099511628211n;

// 32-bit FNV prime (16777619)
const FNV_PRIME = 16777619;

/**
 * Convert a provided value into a Fowler-Noll-Vo 1A hash
 * For more info: https://tools.ietf.org/html/draft-eastlake-fnv-03
 *
 * @param {unknown} data - Value to be converted
 * @param {number} offset - (default=2166136261) FNV prime to use
 */
function fnv1A (data:unknown, offset:number = FNV_32):number {
    let hash = offset;
    const str = toString(data);
    const len = str.length;

    for (let i = 0; i < len; i++) {
        hash ^= str.charCodeAt(i);

        // Math.imul Performs C-like 32-bit multiplication in one CPU instruction.
        hash = Math.imul(hash, FNV_PRIME);
    }

    // Force unsigned 32-bit integer
    return hash >>> 0;
}

export {fnv1A, fnv1A as default};
