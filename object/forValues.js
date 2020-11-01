'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _noopreturn2.default;

    if (!(0, _is4.default)(obj) || (0, _is2.default)(obj)) {
        throw new TypeError('Please pass an object to forValues');
    }

    Object.keys(obj).forEach(function (key, index) {
        obj[key] = cb(key, obj[key], index);
    });
    return obj;
};

var _noopreturn = require('../function/noopreturn');

var _noopreturn2 = _interopRequireDefault(_noopreturn);

var _is = require('../array/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('./is');

var _is4 = _interopRequireDefault(_is3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }