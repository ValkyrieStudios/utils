'use strict';

import round from '../number/round';

interface mapOptions {
    /**
     * Automatically trim all string values
     * (default=false)
     * eg: join([' hello   ', ' world '], {valtrim: true}) -> 'hello world'
     */
    valtrim?:boolean;
    /**
     * Automatically round all numeric values
     * (default=false)
     * eg: mapPrimitive([5.432, 5.4, 5.43, 4.2, 4.1], {valround: true}) -> {'5.432': 5, '5.4': 5, '5.43': 5, '4.2': 4, '4.1': 4}
     * eg: mapPrimitive([5.432, 5.43, 4.21, 4.1], {valround: 1}) -> {'5.432': 5.4, '5.43': 5.4, '4.21': 4.2, '4.1': 4.1}
     */
    valround?:boolean|number;
    /**
     * Automaticaly round all keys from numeric values
     * (default=false)
     * eg: mapPrimitive([5.432, 5.4, 5.43, 4.2, 4.1], {keyround: true}) -> {5: 5.43, 4: 4.1}
     */
    keyround?:boolean;
}

interface mapReturn {
    [key:string]: string|number;
}

/**
 * Map an array of primitive values (numbers/strings) into a kv-object
 * non-numeric and non-string values will be filtered out
 *
 * Example:
 *  mapPrimitive(['hello', 'hello', 'foo', 'bar']);
 * Output:
 *  {hello: 'hello', foo: 'foo', bar: 'bar'}
 *
 * @param val - Array to map
 * @param opts - Options object to override built-in defaults
 *
 * @returns KV-Map object
 */
export default function mapPrimitive (
    arr:unknown[],
    opts:mapOptions = {}
):mapReturn {
    if (!Array.isArray(arr) || !arr.length) return {};

    const OPTS:mapOptions = {
        valtrim: false,
        valround: false,
        keyround: false,
        ...Object.prototype.toString.call(opts) === '[object Object]' ? opts : {},
    };

    const map:mapReturn = {};
    for (const el of arr) {
        if (typeof el === 'string' && el.trim().length) {
            map[el.trim()] = OPTS.valtrim ? el.trim() : el;
        } else if (typeof el === 'number' && Number.isFinite(el)) {
            map[`${OPTS.keyround === true ? Math.round(el) : el}`] = OPTS.valround === false
                ? el
                : OPTS.valround === true
                    ? Math.round(el)
                    : round(el, OPTS.valround);
        }
    }

    return map;
}
