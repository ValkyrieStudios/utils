import {isObject} from './object';
import {isArray} from './array';

function deep (obj, cb = Object.seal) {
    (Object.keys(obj) || []).forEach((key) => {
        if (isObject(obj[key] || false) || isArray(obj[key] || false)) {
            deep(obj[key], cb);
        }
    });
    return cb(obj);
}

//  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] ( faster processing )
function interpolatePath (path) {
    if (!path) throw new TypeError('No Path was given');
    return path.replace('[', '.').replace(']', '').split('.');
}

//  Freeze nested structures
export function deepFreeze (obj) {
    if (!isObject(obj) && !isArray(obj)) {
        throw new TypeError('Only objects can be frozen');
    }

    return deep(obj, Object.freeze);
}

//  Seal nested structures
export function deepSeal (obj) {
    if (!isObject(obj) && !isArray(obj)) {
        throw new TypeError('Only objects can be sealed');
    }

    return deep(obj, Object.seal);
}

//  Set a value for a path in a json-like structure
export function deepSet (obj, path, value = null, define = false) {
    if (!isObject(obj)) throw new TypeError('Deepget is only supported for objects');
    const parts = interpolatePath(path);

    //  Build any unknown paths and set cursor
    for (let i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];

        //  If not an array continue
        if (!isArray(obj)) continue;

        //  If an array and i is not the last index ... set the object to be the index on the array
        if (i < parts.length - 2) {
            obj = obj[parts[i + 1]];
            i++;
        }
    }

    //  Set the actual value on the cursor
    define
        ? Object.defineProperty(obj, parts[parts.length - 1], value)
        : obj[parts[parts.length - 1]] = value;

    return true;
}

export function deepDefine (obj, path, value = null) {
    return deepSet(obj, path, value, true);
}

//  Get a value from a path in a json-like structure
export function deepGet (obj, path, get_parent = false) {
    if (!isObject(obj)) throw new TypeError('Deepget is only supported for objects');

    const parts = interpolatePath(path);

    //  Return obj if no parts were passed or if only 1 part and get_parent is true
    if (parts.length === 0 || (parts.length === 1 && get_parent)) return obj;

    //  Cut last part if get_parent
    if (get_parent) parts.pop();

    let cursor = obj;

    while (parts.length > 0) {
        cursor = isArray(cursor) ? cursor[parseInt(parts.shift())] : cursor[parts.shift()];
    }

    return (cursor || cursor === false || cursor === 0) ? cursor : undefined;
}
