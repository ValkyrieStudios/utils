import {fnv1A} from './hash';

export function memoize (fn) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        let hash = fnv1A(args);

        //  Set memoization cache on the function if it doesn't exist yet
        fn.memoize || (fn.memoize = Object.create(null));

        //  Check if the map contains our hash as a key
        //  true --> return the value associated with the hash immediately
        //  false --> make a function call and store the result in the map, then return the result
        if (fn.memoize[hash]) {
            return fn.memoize[hash];
        }

        const result = fn.apply(this, args);

        fn.memoize[hash] = result;
        return result;
    };
};
