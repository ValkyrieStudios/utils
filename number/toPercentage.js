'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    if (!(0, _is2.default)(val) || (0, _isNumericalNaN2.default)(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (!(0, _is2.default)(min) || (0, _isNumericalNaN2.default)(min)) {
        throw new TypeError('Value should be numeric');
    }

    if (!(0, _is2.default)(max) || (0, _isNumericalNaN2.default)(max)) {
        throw new TypeError('Value should be numeric');
    }

    return (0, _round2.default)((val - min) / (max - min) * 100, precision);
};

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _isNumericalNaN = require('./isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }