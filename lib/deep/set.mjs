'use strict';

//  Set a value for a path in a json-like structure
export default function deepSet (obj, path, value = null, define = false) {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepset is only supported for objects');

    //  If no path is provided, do nothing
    if (typeof path !== 'string') throw new TypeError('No path was given');

    //  Check if path contains content
    const path_s = path.trim();
    if (path_s.length === 0) throw new TypeError('No path was given');

    //  Check if path contains rejected keys
    if (/__proto__|constructor|prototype/.test(path_s)) throw new Error('Malicious path provided');

    //  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
    const parts = path_s
        .replace(/\[/g, '.')
        .replace(/(\.){2,}/g, '.')
        .replace(/(^\.|\.$|\])/g, '')
        .split('.');

    //  Build any unknown paths and set cursor
    for (let i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];
    }

    //  Prevent overriding of properties, eg: {d: 'hello'} -> deepSet('d.a.b', 'should not work')
    if (!Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]') return false;

    //  Set the actual value on the cursor
    if (define) {
        Object.defineProperty(obj, parts[parts.length - 1], value);
    } else {
        obj[parts[parts.length - 1]] = value;
    }

    return true;
}
