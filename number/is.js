'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    return typeof val === 'number' || (0, _isNumericalNaN2.default)(val) || val instanceof Number;
};

var _isNumericalNaN = require('./isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }