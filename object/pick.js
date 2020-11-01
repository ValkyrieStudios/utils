'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (!(0, _is4.default)(obj) || (0, _is2.default)(obj)) {
        throw new TypeError('Please pass an object to pick as the value for obj');
    }

    if (!(0, _is2.default)(keys)) {
        throw new TypeError('Please pass an array as the value for keys');
    }

    return keys.reduce(function (acc, key) {
        var val = (0, _get2.default)(obj, key);
        if (val !== undefined) (0, _set2.default)(acc, key, val);
        return acc;
    }, {});
};

var _get = require('../deep/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('../deep/set');

var _set2 = _interopRequireDefault(_set);

var _is = require('../array/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('./is');

var _is4 = _interopRequireDefault(_is3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }