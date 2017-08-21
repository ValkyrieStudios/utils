'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.memoize = memoize;
function _Map() {
    var _this = this;

    if (Map) return new Map(); // eslint-disable-line no-undef

    return Object.defineProperties({
        _: {}
    }, {
        set: {
            value: function value(key, val) {
                return _this._[key] = val;
            }
        },
        get: {
            value: function value(key) {
                return _this._[key] || undefined;
            }
        },
        has: {
            value: function value(key) {
                return !!_this._[key];
            }
        }
    });
}

function memoize(fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var hash = '';
        var i = args.length - 1; //  -1 due to koa's context always being the last argument
        var cursor = null;

        //  Set memoization cache on the function if it doesn't exist yet
        fn.memoize || (fn.memoize = _Map());

        //  Create a hash that is compiled off of the parameters to a function (this allows for fast hash lookups)
        while (i--) {
            cursor = args[i];
            hash += cursor === Object(cursor) ? JSON.stringify(cursor) : cursor;
        }

        //  Check if the map contains our hash as a key
        //  true --> return the value associated with the hash immediately
        //  false --> make a function call and store the result in the map, then return the result
        if (fn.memoize.has(hash)) {
            return fn.memoize.get(hash);
        }

        var result = fn.apply(this, args);

        fn.memoize.set(hash, result);
        return result;
    };
};