/* eslint-disable no-confusing-arrow */

import {isNotEmptyObject} from '../object/isNotEmpty';

type Handler <T> = (val:T) => string|number|boolean;

const FALLBACK = '_';
const defaultHandler = () => FALLBACK;

/**
 * Return a grouped object from an array.
 * Take Note: This function will automatically filter out any non/empty objects from the array
 *
 * Example:
 *  const group = groupBy([
 *      {tally: 20, name: 'Peter'},
 *      {tally: 40, name: 'Jake'},
 *      {tally: 5, name: 'Bob'},
 *  ], el => el.tally > 15);
 * Output:
 *  {
 *      false: [{tally: 5, name: 'Bob'}],
 *      true: [{tally: 20, name: 'Peter'}, {tally: 40, name: 'Jake'}],
 *  }
 *
 * @param {T[]} arr - Array to group
 * @param {Handler<T>|keyof T} handler - String or a function, determines what to group by
 */
function groupBy <T extends Record<string, any>> (
    arr:T[],
    handler:Handler<T>|keyof T
):Record<string, T[]> {
    if (!Array.isArray(arr)) return {};

    const acc:Record<string, T[]> = {};
    const n_handler:Handler<T> = typeof handler === 'function'
        ? handler
        : typeof handler === 'string'
            ? ((el:T) => el[handler]) as Handler<T>
            : defaultHandler;

    let key;
    let el;
    for (let i = 0; i < arr.length; i++) {
        el = arr[i];
        if (!isNotEmptyObject(el)) continue;

        /* Fetch key, if doesnt exist use fallback */
        key = n_handler(el);
        if (key === undefined || (typeof key === 'string' && !key.length)) key = FALLBACK;

        /* If we don't know our key yet create new accumulator, otherwise push onto it */
        if (!acc[key as string]) {
            acc[key as string] = [el];
        } else {
            acc[key as string].push(el);
        }
    }
    return acc;
}

export {groupBy, groupBy as default};
