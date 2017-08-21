'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.deepFreeze = deepFreeze;
exports.deepSeal = deepSeal;
exports.deepSet = deepSet;
exports.deepDefine = deepDefine;
exports.deepGet = deepGet;

var _object = require('./object');

var _array = require('./array');

function deep(obj) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.seal;

    (Object.keys(obj) || []).forEach(function (key) {
        if ((0, _object.isObject)(obj[key] || null)) {
            deep(obj[key], cb);
        }
    });
    return cb(obj);
}

//  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] ( faster processing )
function interpolatePath(path) {
    if (!path) throw new TypeError('No Path was given');
    return path.replace('[', '.').replace(']', '').split('.');
}

//  Freeze nested structures
function deepFreeze(obj) {
    if (!(0, _object.isObject)(obj) && !(0, _array.isArray)(obj)) {
        throw new TypeError('Only objects can be frozen');
    }

    return deep(obj, Object.freeze);
}

//  Seal nested structures
function deepSeal(obj) {
    if (!(0, _object.isObject)(obj) && !(0, _array.isArray)(obj)) {
        throw new TypeError('Only objects can be sealed');
    }

    return deep(obj, Object.seal);
}

//  Set a value for a path in a json-like structure
function deepSet(obj, path) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var define = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;

    if (!(0, _object.isObject)(obj)) throw new TypeError('Deepget is only supported for objects');
    var parts = interpolatePath(path);

    //  Build any unknown paths and set cursor
    for (var i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];

        //  If not an array continue
        if (!(0, _array.isArray)(obj)) continue;

        //  If an array and i is not the last index ... set the object to be the index on the array
        if (i < parts.length - 2) {
            obj = obj[parts[i + 1]];
            i++;
        }
    }

    //  Set the actual value on the cursor
    define ? Object.defineProperty(obj, parts[parts.length - 1], value) : obj[parts[parts.length - 1]] = value;

    return !0;
}

function deepDefine(obj, path) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return deepSet(obj, path, value, !0);
}

//  Get a value from a path in a json-like structure
function deepGet(obj, path) {
    var get_parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;

    if (!(0, _object.isObject)(obj)) throw new TypeError('Deepget is only supported for objects');
    var parts = interpolatePath(path);

    for (var i = 0; i < parts.length - 1; i++) {
        if ((0, _array.isArray)(obj[parts[i]])) {
            obj = obj[parts[i]][parts[i + 1]];
            i++;
            continue;
        }

        obj = obj[parts[i]];
    }

    return get_parent ? { scope: obj, key: parts[parts.length - 1] } : obj[parts[parts.length - 1]];
}