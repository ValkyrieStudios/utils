'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function deepSet(obj, path, value, define = false) {
    if (Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj))
        throw new TypeError('Deepset is only supported for objects');
    if (typeof path !== 'string')
        throw new TypeError('No path was given');
    if (/__proto__|constructor|prototype/.test(path))
        throw new TypeError('Malicious path provided');
    const path_s = path.trim();
    if (path_s.length === 0)
        throw new TypeError('No path was given');
    const parts = path_s
        .replace(/\[/g, '.')
        .replace(/(\.){2,}/g, '.')
        .replace(/(^\.|\.$|\])/g, '')
        .split('.');
    for (let i = 0; i < parts.length - 1; i++) {
        if (parts[i] === '')
            continue;
        if (Array.isArray(obj)) {
            const idx = parseInt(parts[i]);
            if (!Number.isInteger(idx) || idx < 0)
                throw new TypeError('Invalid path provided');
            if (!obj[idx])
                obj[idx] = {};
            obj = obj[idx];
        }
        else {
            if (!obj[parts[i]])
                obj[parts[i]] = {};
            obj = obj[parts[i]];
        }
    }
    if (!Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]')
        return false;
    if (define) {
        Object.defineProperty(obj, parts[parts.length - 1], value);
    }
    else if (Array.isArray(obj)) {
        const idx = parseInt(parts[parts.length - 1]);
        if (!Number.isInteger(idx) || idx < 0)
            throw new TypeError('Invalid path provided');
        obj[idx] = value;
    }
    else {
        obj[parts[parts.length - 1]] = value;
    }
    return true;
}
exports.default = deepSet;
