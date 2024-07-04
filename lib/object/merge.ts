const PROTO_OBJ = '[object Object]';

/**
 * Deep merge two objects together while ensuring nested objects also get merged,
 * take note: this does not merge onto passed objects by reference but instead
 * returns a new object
 *
 * @param target - Base Object
 * @param source - (default={}) Object to merge onto base object
 *
 * @returns Combined target and source objects
 */
function merge (
    target:{[key:string]:any},
    source:{[key:string]:any} = {}
):{[key:string]:any} {
    if (
        Object.prototype.toString.call(target) !== PROTO_OBJ ||
        Object.prototype.toString.call(source) !== PROTO_OBJ
    ) throw new TypeError('Please pass a target and object to merge');

    const acc:{[key:string]:any} = {};
    for (const key in target) {
        if (
            Object.prototype.toString.call(target[key]) === PROTO_OBJ &&
            Object.prototype.toString.call(source[key]) === PROTO_OBJ
        ) {
            acc[key] = merge(target[key], source[key]);
        } else {
            acc[key] = source[key] !== undefined ? source[key] : target[key];
        }
    }

    return acc;
}

export {merge, merge as default};
