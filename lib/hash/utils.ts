/**
 * Convert data to a format that is hashable
 *
 * @param {unknown} raw - Value to be converted
 */
export function toString (raw:unknown):string {
    const type = typeof raw;

    // Fast path for Primitives
    if (type === 'string') return raw as string;

    if (type === 'number') return Number.isFinite(raw) ? String(raw) : 'nan';

    if (type === 'boolean') return raw ? 'true' : 'false';
    if (type === 'undefined') return 'undefined';

    // 2. Complex Objects
    if (type === 'object') {
        if (raw === null) return 'null';

        // Fast paths for common specialized objects
        if (Array.isArray(raw) || Object.prototype.toString.call(raw) === '[object Object]') return JSON.stringify(raw);
        if (raw instanceof Date) return String(raw.getTime());
        if (raw instanceof RegExp) return String(raw);
        if (raw instanceof Error) return raw.name + '|' + raw.message;

        throw new TypeError('A Hash could not be calculated for this datatype');
    }

    if (type === 'bigint') return (raw as bigint).toString();
    if (type === 'symbol') return (raw as symbol).toString();

    throw new TypeError('A Hash could not be calculated for this datatype');
}
