'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _is = require('./object/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('./array/is');

var _is4 = _interopRequireDefault(_is3);

var _isNumericalNaN = require('./number/isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

var _is5 = require('./regexp/is');

var _is6 = _interopRequireDefault(_is5);

var _is7 = require('./date/is');

var _is8 = _interopRequireDefault(_is7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isArrayEqual(a, b) {
    if (a.length !== b.length) return !1;

    for (var i = a.length - 1; i >= 0; i--) {
        if (equal(a[i], b[i])) continue;
        return !1;
    }

    return !0;
}

function isObjectEqual(a, b) {
    var keys_a = Object.keys(a);

    if (keys_a.length !== Object.keys(b).length) return !1;

    for (var i = keys_a.length - 1; i >= 0; i--) {
        if (equal(a[keys_a[i]], b[keys_a[i]])) continue;
        return !1;
    }

    return !0;
};

function equal(a, b) {
    //  Date Check
    if ((0, _is8.default)(a) && (0, _is8.default)(b)) {
        return a.valueOf() === b.valueOf();
    }

    //  RegExp Check
    if ((0, _is6.default)(a) || (0, _is6.default)(b)) {
        return String(a) === String(b);
    }

    //  Array as root equal
    if ((0, _is4.default)(a) && (0, _is4.default)(b)) {
        return isArrayEqual(a, b);
    }

    //  Object as root equal
    if ((0, _is2.default)(a) && (0, _is2.default)(b)) {
        return isObjectEqual(a, b);
    }

    //  NAN Check
    if ((0, _isNumericalNaN2.default)(a)) {
        return (0, _isNumericalNaN2.default)(b);
    }

    //  No special cases anymore, simply do strict equal
    return a === b;
}

exports.default = equal;