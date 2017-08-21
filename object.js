'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.pick = pick;
exports.merge = merge;
exports.zip = zip;
exports.define = define;
exports.defineFrozen = defineFrozen;
exports.defineSealed = defineSealed;

var _array = require('./array');

function isObject(val) {
    var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);

    return val !== null && (type === 'object' || type === 'function');
}

function pick() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return keys.reduce(function (acc, key) {
        acc[key] = obj[key] || null;
        return acc;
    }, {});
}

function merge() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(target).reduce(function (acc, key) {
        if (isObject(target[key]) && !(0, _array.isArray)(target[key])) {
            acc[key] = merge(target[key], obj[key] || {});
        } else {
            acc[key] = obj.hasOwnProperty(key) ? obj[key] : target[key];
        }
        return acc;
    }, {});
}

function zip() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return keys.reduce(function (acc, key, index) {
        acc[key] = values[index] || null;
        return acc;
    }, {});
}

function define(props) {
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.defineProperties(obj, props);
}

function defineFrozen(props) {
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.freeze(define(props, obj));
}

function defineSealed(props) {
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.seal(define(props, obj));
}