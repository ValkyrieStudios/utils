'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val, min, max) {
    var trimmed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;

    if (!(0, _is2.default)(val)) return !1;

    if (!(0, _is4.default)(min) || !(0, _is4.default)(max)) return !1;

    if (min >= max) return !1;

    var length = (!!trimmed ? val.trim() : val).length;
    return length >= min && length <= max;
};

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('../number/is');

var _is4 = _interopRequireDefault(_is3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }