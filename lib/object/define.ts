'use strict';

/**
 * Defines each of the provided properties in props on top of the passed object
 *
 * @param props - Object with properties to define
 * @param obj - (default={}) Object to define on top of
 *
 * @returns Object with the defined properties
 */
export default function define (
    props:{[key:string]:any},
    obj:{[key:string]:any} = {}
):{[key:string]:any} {
    if (
        Object.prototype.toString.call(props) !== '[object Object]' ||
        Object.prototype.toString.call(obj) !== '[object Object]'
    ) throw new TypeError('Please pass an object as the value for props and obj');

    return Object.defineProperties(obj, props);
}
