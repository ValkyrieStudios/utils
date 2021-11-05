'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    if ((0, _isNumericalNaN2.default)(val)) return !1;
    return typeof val === 'number' || val instanceof Number;
};

var _isNumericalNaN = require('./isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }