'use strict';

//  TODO : nan === nan should be true
//  TODO : regexp === regexp should be true if string contents are equal

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.equal = equal;

var _object = require('./object');

var _array = require('./array');

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
    //  Array as root equal
    if ((0, _array.isArray)(val_a) && (0, _array.isArray)(val_b)) return isArrayEqual(val_a, val_b);

    //  Object as root equal
    if ((0, _object.isObject)(val_a) && (0, _object.isObject)(val_b)) return isObjectEqual(val_a, val_b);

    //  Primitive Equal
    if (val_a === val_b) return !0;

    return !1;
}