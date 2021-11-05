'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val, min, max) {
    if (!(0, _is2.default)(val) || !(0, _is2.default)(min) || !(0, _is2.default)(max)) return !1;

    if (min >= max) return !1;

    return val >= min && val <= max;
};

var _is = require('../number/is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }