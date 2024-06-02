import {round} from '../number/round';
import {isInteger} from '../number/isInteger';

interface joinOptions {
    /**
     * Delimiter to join with
     * (default=' ')
     * eg: join(['hello', 'world', {delim: '_'}]) -> 'hello_world'
     */
    delim?:string;
    /**
     * Trim after joining or not
     * (default=true)
     * eg: join(['  hello', 'world  '], {trim: true}) -> 'hello world'
     */
    trim?:boolean;
    /**
     * Automatically trim all string values
     * (default=true)
     * eg: join([' hello   ', ' world '], {valtrim: true}) -> 'hello world'
     */
    valtrim?:boolean;
    /**
     * Automatically round all numeric values
     * (default=false)
     * eg: join([5.432, 'world', 1.2], {valround: 1}) -> '5.4 world 1.2'
     */
    valround?:number;
}

/**
 * Join an array of values while autofiltering any non-string/non-number elements
 *
 * @param {unknown[]} val - Array of values to join
 * @param {joinOptions?} opts - Join options
 *
 * @returns Joined array as string
 */
function join (val:unknown[], opts?:joinOptions):string {
    if (!Array.isArray(val) || !val.length) return '';

    let DELIM:string = ' ';
    let TRIM:boolean = true;
    let VALTRIM:boolean = true;
    let VALROUND:number|false = false;
    if (opts && Object.prototype.toString.call(opts) === '[object Object]') {
        if (typeof opts.delim === 'string') DELIM = opts.delim;
        if (opts.trim === false) TRIM = opts.trim;
        if (opts.valtrim === false) VALTRIM = opts.valtrim;
        if (isInteger(opts.valround) && opts.valround >= 0) VALROUND = opts.valround;
    }

    const filtered = [];
    for (const el of val) {
        if (typeof el === 'string' && el.trim().length) {
            filtered.push(VALTRIM ? el.trim() : el);
        } else if (Number.isFinite(el)) {
            filtered.push(VALROUND !== false ? round(el as number, VALROUND) : el);
        }
    }

    return TRIM ? filtered.join(DELIM).trim() : filtered.join(DELIM);
}

export {join, join as default};
