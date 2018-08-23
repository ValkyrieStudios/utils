'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.equal = equal;

var _object = require('./object');

var _array = require('./array');

var _number = require('./number');

var _regexp = require('./regexp');

var _date = require('./date');

var isArrayEqual = function isArrayEqual(a, b) {
    if (a.length !== b.length) return !1;

    for (var i = a.length - 1; i >= 0; i--) {
        if (equal(a[i], b[i])) continue;
        return !1;
    }

    return !0;
};

var isObjectEqual = function isObjectEqual(a, b) {
    var keys_a = Object.keys(a);

    if (keys_a.length !== Object.keys(b).length) return !1;

    for (var i = keys_a.length - 1; i >= 0; i--) {
        if (equal(a[keys_a[i]], b[keys_a[i]])) continue;
        return !1;
    }

    return !0;
};

function equal(val_a, val_b) {
    //  Date Check
    if ((0, _date.isDate)(val_a) && (0, _date.isDate)(val_b)) {
        return val_a.valueOf() === val_b.valueOf();
    }

    //  RegExp Check
    if ((0, _regexp.isRegExp)(val_a) || (0, _regexp.isRegExp)(val_b)) {
        return String(val_a) === String(val_b);
    }

    //  Array as root equal
    if ((0, _array.isArray)(val_a) && (0, _array.isArray)(val_b)) {
        return isArrayEqual(val_a, val_b);
    }

    //  Object as root equal
    if ((0, _object.isObject)(val_a) && (0, _object.isObject)(val_b)) {
        return isObjectEqual(val_a, val_b);
    }

    //  NAN Check
    if ((0, _number.isNumericalNaN)(val_a)) {
        return (0, _number.isNumericalNaN)(val_b);
    }

    //  No special cases anymore, simply do strict equal
    return val_a === val_b;
}