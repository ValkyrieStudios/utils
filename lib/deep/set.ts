'use strict';

/**
 * Sets a property and its value deep in the structure of an object
 *
 * Example:
 *  const myObj = {a: 2};
 *  deepSet(myObj, 'b.c.d.e', 4);
 * Output:
 *  {
 *      a: 2,
 *      b: {
 *          c: {
 *              d: {
 *                  e: 4
 *              }
 *          }
 *      }
 *  }
 *
 * Example:
 *  const myObj = {a: 2, b: [{price: 2}]};
 *  deepSet(myObj, 'b[0].price', 4);
 * Output:
 *  {
 *      a: 2,
 *      b: [
 *          {price: 4}
 *      ]
 *  }
 *
 * @param val - Object to set the value on
 * @param path - Path string to deeply set the value at
 * @param value - Value to set (if using defineProperty can be an accessor object)
 * @param define - Whether or not the property should be directly assigned or set using Object.defineProperty
 *
 * @returns True or false depending on whether or not the property was set correctly
 * @throws {TypeError}
 */
export default function deepSet (
    obj:{[key:string]:any},
    path:string,
    value:any,
    define:boolean=false
) {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepset is only supported for objects');

    //  If no path is provided, do nothing
    if (typeof path !== 'string') throw new TypeError('No path was given');

    //  Check if path contains rejected keys
    if (/__proto__|constructor|prototype/.test(path)) throw new TypeError('Malicious path provided');

    //  Check if path contains content
    const path_s = path.trim();
    if (path_s.length === 0) throw new TypeError('No path was given');

    //  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
    const parts = path_s
        .replace(/\[/g, '.')
        .replace(/(\.){2,}/g, '.')
        .replace(/(^\.|\.$|\])/g, '')
        .split('.');

    //  Build any unknown paths and set cursor
    for (let i = 0; i < parts.length - 1; i++) {
        //  If this part is an empty string, just continue
        if (parts[i] === '') continue;

        if (!obj[parts[i]]) obj[parts[i]] = {};

        //  Set cursor
        obj = obj[parts[i]];
    }

    //  Prevent overriding of properties, eg: {d: 'hello'} -> deepSet('d.a.b', 'should not work')
    if (!Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]') return false;

    //  Set the actual value on the cursor
    if (define) {
        Object.defineProperty(obj, parts[parts.length - 1], value);
    } else {
        obj[parts[parts.length - 1]] = value;
    }

    return true;
}
