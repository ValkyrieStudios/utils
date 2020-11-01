'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!(0, _is2.default)(props) || !(0, _is2.default)(obj)) {
        throw new TypeError('Please pass an object as the value for props and obj');
    }

    return Object.defineProperties(obj, props);
};

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }