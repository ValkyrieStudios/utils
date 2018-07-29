'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.isArray = isArray;
exports.dedupe = dedupe;

var _hash = require('./hash');

function isArray(val) {
    return Array.isArray(val);
}

function dedupe() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var seen = {};
    return val.filter(function (item) {
        var hash = (0, _hash.fnv1A)(item);
        return Object.prototype.hasOwnProperty.call(seen, hash) ? !1 : seen[hash] = !0;
    });
}