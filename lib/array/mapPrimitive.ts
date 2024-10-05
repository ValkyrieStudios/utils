import {round} from '../number/round';
import {isIntegerAboveOrEqual} from '../number/isIntegerAboveOrEqual';

type MapOptions = {
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
    /**
     * Pass a custom filter function which will be run in O(n) while iterating
     */
    filter_fn?: (el: unknown) => boolean;
}

type mapReturn = Record<string, string|number>;

/**
 * Map an array of primitive values (numbers/strings) into a kv-object
 * non-numeric and non-string values will be filtered out
 *
 * Example:
 *  mapPrimitive(['hello', 'hello', 'foo', 'bar']);
 * Output:
 *  {hello: 'hello', foo: 'foo', bar: 'bar'}
 *
 * @param {unknown[]} val - Array to map
 * @param {MapOptions?} opts - Options object to override built-in defaults
 */
function mapPrimitive (arr:unknown[], opts:MapOptions = {}):mapReturn {
    if (!Array.isArray(arr) || !arr.length) return {};

    const VALTRIM:boolean = opts?.valtrim === true;
    const VALROUND:number|null = isIntegerAboveOrEqual(opts?.valround, 0)
        ? opts?.valround
        : opts?.valround === true
            ? 0
            : null;
    const KEYROUND:number|boolean = opts?.keyround === true;
    const FILTER_FN = opts?.filter_fn;

    const map:mapReturn = {};
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (FILTER_FN && !FILTER_FN(el)) continue;

        if (typeof el === 'string') {
            const trimmed = el.trim();
            if (!trimmed) continue;
            map[trimmed] = VALTRIM ? trimmed : el;
        } else if (Number.isFinite(el)) {
            /* eslint-disable-next-line */
            /* @ts-ignore Typescript doesn't recognize el as a number here */
            map[`${KEYROUND ? Math.round(el) : el}`] = VALROUND === null
                ? el
                : round(el as number, VALROUND);
        }
    }

    return map;
}

export {mapPrimitive, mapPrimitive as default};
