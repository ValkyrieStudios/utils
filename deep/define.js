'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function (obj, path) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return (0, _set2.default)(obj, path, value, !0);
};

var _set = require('./set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }