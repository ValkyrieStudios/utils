'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!(0, _is2.default)(val) || (0, _isNumericalNaN2.default)(val)) {
        throw new TypeError('Value should be numeric');
    }

    if (precision === !1 || precision < 1) {
        return Math.round(val);
    }

    var exp = Math.pow(10, Math.round(precision));
    return Math.round(val * exp) / exp;
};

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _isNumericalNaN = require('./isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }