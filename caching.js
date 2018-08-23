"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.memoize = memoize;
function memoize(fn) {
    var cache = {};

    return function memoized() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var key = JSON.stringify(args);

        if (key in cache) {
            return cache[key];
        }

        return cache[key] = fn.apply(undefined, args);
    };
};