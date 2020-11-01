'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.freeze((0, _define2.default)(props, obj));
};

var _define = require('./define');

var _define2 = _interopRequireDefault(_define);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }