'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function deepGet(obj, path, get_parent = false) {
    if (Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj))
        throw new TypeError('Deepget is only supported for objects');
    if (typeof path !== 'string')
        throw new TypeError('No path was given');
    const path_s = path.trim();
    if (path_s.length === 0)
        throw new TypeError('No path was given');
    const parts = path_s
        .replace(/\[/g, '.')
        .replace(/(\.){2,}/g, '.')
        .replace(/(^\.|\.$|\])/g, '')
        .split('.');
    if (parts.length === 0 || (parts.length === 1 && get_parent))
        return obj;
    if (get_parent)
        parts.pop();
    let cursor = obj;
    while (parts.length > 0) {
        if (Array.isArray(cursor)) {
            const ix = parseInt(parts.shift());
            if (!Number.isInteger(ix) || ix < 0 || ix > (cursor.length - 1))
                return undefined;
            cursor = cursor[ix];
        }
        else if (Object.prototype.toString.call(cursor) === '[object Object]') {
            const key = parts.shift();
            if (!Object.prototype.hasOwnProperty.call(cursor, key))
                return undefined;
            cursor = cursor[key];
        }
        if ((!Array.isArray(cursor) && Object.prototype.toString.call(cursor) !== '[object Object]') &&
            parts.length > 0)
            return undefined;
    }
    return cursor;
}
exports.default = deepGet;
