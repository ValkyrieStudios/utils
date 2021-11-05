'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (val) {
    var trimmed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;

    if (!(0, _is2.default)(val)) return !1;
    return (trimmed ? val.trim() : val).length !== 0;
};

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }