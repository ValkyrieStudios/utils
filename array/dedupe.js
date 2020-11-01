'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function () {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var seen = {};
    return val.filter(function (item) {
        var hash = (0, _fnv1A2.default)(item);
        return Object.prototype.hasOwnProperty.call(seen, hash) ? !1 : seen[hash] = !0;
    });
};

var _fnv1A = require('../hash/fnv1A');

var _fnv1A2 = _interopRequireDefault(_fnv1A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }