'use strict';

/* eslint-disable no-confusing-arrow */

import {isNotEmptyObject} from '../object/isNotEmpty';

type Handler <T> = (val:T) => string|number|boolean;

const FALLBACK = '_';
const defaultHandler = () => FALLBACK;

function groupBy <T extends Record<string, any>> (arr:T[], handler:Handler<T>|string):Record<string, T[]> {
    if (!Array.isArray(arr)) return {};

    const acc:Record<string, T[]> = {};
    const n_handler:Handler<T> = typeof handler === 'function'
        ? handler
        : typeof handler === 'string'
            ? ((el:T) => el[handler]) as Handler<T>
            : defaultHandler;

    let key;
    for (const el of arr) {
        if (!isNotEmptyObject(el)) continue;

        /* Fetch key, if doesnt exist use fallback */
        key = n_handler(el);
        if (key === undefined || (typeof key === 'string' && !key.length)) key = FALLBACK;

        /* If we don't know our key yet, add to set and create new accumulator for key */
        if (Array.isArray(acc[key as string])) {
            acc[key as string].push(el);
            continue;
        }

        acc[key as string] = [el];
    }
    return acc;
}

export {groupBy, groupBy as default};
