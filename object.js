'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isObject = isObject;
exports.pick = pick;
exports.merge = merge;
exports.forValues = forValues;
exports.zip = zip;
exports.define = define;
exports.defineFrozen = defineFrozen;
exports.defineSealed = defineSealed;

var _array = require('./array');

var _deep = require('./deep');

var _function = require('./function.js');

function isObject(val) {
    return val !== null && Object.prototype.toString.call(val) === "[object Object]";
}

function pick() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (!isObject(obj) || (0, _array.isArray)(obj)) {
        throw new TypeError('Please pass an object to pick as the value for obj');
    }

    if (!(0, _array.isArray)(keys)) {
        throw new TypeError('Please pass an array as the value for keys');
    }

    return keys.reduce(function (acc, key) {
        (0, _deep.deepSet)(acc, key, (0, _deep.deepGet)(obj, key) || undefined);
        return acc;
    }, {});
}

function merge() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isObject(target) || (0, _array.isArray)(target)) {
        throw new TypeError('Please pass an object to merge');
    }

    return Object.keys(target).reduce(function (acc, key) {
        if (isObject(target[key]) && !(0, _array.isArray)(target[key])) {
            acc[key] = merge(target[key], obj[key] || {});
        } else {
            acc[key] = obj.hasOwnProperty(key) ? obj[key] : target[key];
        }
        return acc;
    }, {});
}

function forValues() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _function.noopreturn;

    if (!isObject(obj) || (0, _array.isArray)(obj)) {
        throw new TypeError('Please pass an object to forValues');
    }

    Object.keys(obj).forEach(function (key, index) {
        obj[key] = cb(key, obj[key], index);
    });
    return obj;
}

function zip() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var default_to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!(0, _array.isArray)(keys)) {
        throw new TypeError('Please pass an array as value for keys');
    }

    if (!(0, _array.isArray)(values) && values !== !1) {
        throw new TypeError('Please pass an array or false as value for values');
    }

    return keys.reduce(function (acc, key, index) {
        acc[key] = values ? values[index] || default_to : default_to;
        return acc;
    }, {});
}

function define() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!isObject(props) || !isObject(obj)) {
        throw new TypeError('Please pass an object as the value for props and obj');
    }

    return Object.defineProperties(obj, props);
}

function defineFrozen() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.freeze(define(props, obj));
}

function defineSealed() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.seal(define(props, obj));
}