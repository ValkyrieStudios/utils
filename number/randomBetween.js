'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    if (!(0, _is2.default)(min) || (0, _isNumericalNaN2.default)(min)) {
        throw new TypeError('Min should be numeric');
    }

    if (!(0, _is2.default)(max) || (0, _isNumericalNaN2.default)(max)) {
        throw new TypeError('Max should be numeric');
    }

    return Math.random() * max + min;
};

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _isNumericalNaN = require('./isNumericalNaN');

var _isNumericalNaN2 = _interopRequireDefault(_isNumericalNaN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }