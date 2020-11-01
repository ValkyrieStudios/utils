'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (obj) {
    if (!(0, _is2.default)(obj) && !(0, _is4.default)(obj)) {
        throw new TypeError('Only objects can be frozen');
    }

    return deep(obj, Object.freeze);
};

var _is = require('../object/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('../array/is');

var _is4 = _interopRequireDefault(_is3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deep(obj) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.seal;

    (Object.keys(obj) || []).forEach(function (key) {
        if ((0, _is2.default)(obj[key] || !1) || (0, _is4.default)(obj[key] || !1)) {
            deep(obj[key], cb);
        }
    });
    return cb(obj);
}

//  Freeze nested structures