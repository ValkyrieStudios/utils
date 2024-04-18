'use strict';

/**
 * Get a property's value deep inside the structure of an array/object
 *
 * Example:
 *  const myObj = {
 *      a: 2,
 *      b: [
 *          {price : 2},
 *          {price : 4},
 *      ],
 *  };
 *  deepGet(myObj, 'b[0].price');
 * Output:
 *  2
 *
 * @param val - Object/Array to get the value from
 * @param path - Path string to deeply get the value at
 * @param get_parent - If passed as true retrieves the parent of where the value lives
 *
 * @returns Value stored at property or undefined
 * @throws {TypeError}
 */
function deepGet (
    obj:{[key:string]:any}|{[key:string]:any}[]|any[],
    path:string,
    get_parent:boolean=false
):any|undefined {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepget is only supported for objects');

    //  If no path is provided, do nothing
    if (typeof path !== 'string') throw new TypeError('No path was given');

    //  Check if path contains content
    const path_s = path.trim();
    if (!path_s.length) throw new TypeError('No path was given');

    //  Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing)
    const parts = path_s
        .replace(/\[/g, '.')
        .replace(/(\.){2,}/g, '.')
        .replace(/(^\.|\.$|\])/g, '')
        .split('.');

    //  Return obj if no parts were passed or if only 1 part and get_parent is true
    if (!parts.length || (parts.length === 1 && get_parent)) return obj;

    //  Cut last part if get_parent
    if (get_parent) parts.pop();

    let cursor = obj;
    while (parts.length) {
        if (Array.isArray(cursor)) {
            const ix = parseInt(parts.shift());
            if (!Number.isInteger(ix) || ix < 0 || ix > (cursor.length - 1)) return undefined;
            cursor = cursor[ix];
        } else if (Object.prototype.toString.call(cursor) === '[object Object]') {
            const key = parts.shift();
            if (!Object.prototype.hasOwnProperty.call(cursor, key)) return undefined;
            cursor = cursor[key];
        }

        //  If we have more parts and cursor is not an array or object -> immediately return undefined
        if (
            (!Array.isArray(cursor) && Object.prototype.toString.call(cursor) !== '[object Object]') &&
            parts.length
        ) return undefined;
    }

    /**
     * Certain values will negate the ternary, hence we do extra checks here
     * to make sure none of them comes back as undefined
     */
    return cursor;
}

export {deepGet, deepGet as default};
