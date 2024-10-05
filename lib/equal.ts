/* eslint-disable no-use-before-define */

function isArrayEqual (
    a:any[],
    b:any[]
):boolean {
    const a_len = a.length;
    if (a_len !== b.length) return false;

    for (let i = a_len - 1; i >= 0; i--) {
        if (!equal(a[i], b[i])) return false;
    }

    return true;
}

function isObjectEqual (
    a:Record<string, any>,
    b:Record<string, any>
):boolean {
    const a_keys = Object.keys(a);
    const b_keys = Object.keys(b);
    const a_len = a_keys.length;
    if (a_len !== b_keys.length) return false;

    for (let i = a_len - 1; i >= 0; i--) {
        const key = a_keys[i];
        if (!equal(a[key], b[key])) return false;
    }

    return true;
}

function isMapEqual (a: Map<any, any>, b: Map<any, any>): boolean {
    if (a.size !== b.size) return false;
    for (const [key, value] of a) {
        if (!b.has(key) || !equal(value, b.get(key))) return false;
    }
    return true;
}

/**
 * Compute whether or not two provided values are deeply equal
 *
 * @param {any} a - Value to compare against
 * @param {any} b - Value to compare with
 */
function equal (a:any, b:any):boolean {
    if (a === b) return true;

    /**
     * Typeof only has a limited set of outcomes
     * - 'number'
     * - 'object'
     * - 'boolean'
     * - 'string'
     * - 'symbol'
     * - 'undefined'
     * - 'bigint'
     * - 'function'
     *
     * Given that we already check for strict equality above we only need
     * to handle special cases for number and object
     */
    switch (typeof a) {
        case 'number':
            return Number.isNaN(b) && Number.isNaN(a);
        case 'object': {
            /* Early exit for null values */
            if (a === null || b === null) return false;

            /*  Array-like */
            if (Array.isArray(a)) return Array.isArray(b) && isArrayEqual(a, b);

            /* Different prototypes can't be equal */
            const proto_a = Object.prototype.toString.call(a);
            const proto_b = Object.prototype.toString.call(b);
            if (proto_a !== proto_b) return false;

            switch (proto_a) {
                case '[object Date]':
                    return a.valueOf() === b.valueOf();
                case '[object Object]':
                    return isObjectEqual(a, b);
                case '[object Error]':
                    return a.name === b.name && a.message === b.message;
                case '[object RegExp]':
                    return String(a) === String(b);
                case '[object Map]':
                    return isMapEqual(a, b);
                default:
                    return false;
            }
        }
        default:
            return false;
    }
}

export {equal, equal as default};
