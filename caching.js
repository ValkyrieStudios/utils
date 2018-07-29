'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.memoize = memoize;

var _hash = require('./hash');

function memoize(fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var hash = (0, _hash.fnv1A)(args);

        //  Set memoization cache on the function if it doesn't exist yet
        fn.memoize || (fn.memoize = Object.create(null));

        //  Check if the map contains our hash as a key
        //  true --> return the value associated with the hash immediately
        //  false --> make a function call and store the result in the map, then return the result
        if (fn.memoize[hash]) {
            return fn.memoize[hash];
        }

        var result = fn.apply(this, args);

        fn.memoize[hash] = result;
        return result;
    };
};