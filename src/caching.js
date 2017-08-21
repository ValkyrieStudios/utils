'use strict';

function _Map () {
    if (Map) return new Map();  // eslint-disable-line no-undef

    return Object.defineProperties({
        _ : {},
    }, {
        set : {
            value : (key, val) => this._[key] = val,
        },
        get : {
            value : (key) => this._[key] || undefined
        },
        has : {
            value : (key) => !!(this._[key])
        },
    });
}

export function memoize (fn) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        let hash = '';
        let i = args.length - 1;    //  -1 due to koa's context always being the last argument
        let cursor = null;

        //  Set memoization cache on the function if it doesn't exist yet
        fn.memoize || (fn.memoize = _Map());

        //  Create a hash that is compiled off of the parameters to a function (this allows for fast hash lookups)
        while (i--) {
            cursor = args[i];
            hash += (cursor === Object(cursor))
                ? JSON.stringify(cursor)
                : cursor;
        }

        //  Check if the map contains our hash as a key
        //  true --> return the value associated with the hash immediately
        //  false --> make a function call and store the result in the map, then return the result
        if (fn.memoize.has(hash)) {
            return fn.memoize.get(hash);
        }

        const result = fn.apply(this, args);

        fn.memoize.set(hash, result);
        return result;
    };
};
