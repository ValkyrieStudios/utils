/**
 * Convert data to a format that is hashable
 *
 * @param {unknown} raw - Value to be converted
 */
export function toString (raw:unknown):string {
    switch (typeof raw) {
        case 'string':
            return raw;
        case 'number':
            return Number.isFinite(raw) ? String(raw) : 'nan';
        case 'bigint':
            return raw.toString();
        case 'boolean':
            return raw ? 'true' : 'false';
        case 'undefined':
            return 'undefined';
        case 'object':
            if (raw === null) {
                return 'null';
            } else if (Array.isArray(raw) || Object.prototype.toString.call(raw) === '[object Object]') {
                return JSON.stringify(raw);
            } else if (raw instanceof RegExp) {
                return String(raw);
            } else if (raw instanceof Date) {
                return String(raw.getTime());
            } else {
                throw new TypeError('An FNV1A Hash could not be calculated for this datatype');
            }
        case 'symbol':
            return String(raw);
        default:
            throw new TypeError('An FNV1A Hash could not be calculated for this datatype');
    }
}
