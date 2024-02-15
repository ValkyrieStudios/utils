'use strict';

import round from '../number/round';

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
 * @param val - Array of values to join
 * @param opts - Join options
 *
 * @returns Joined array as string
 */
export default function join (
    val:unknown[],
    opts:joinOptions={}
):string {
    if (!Array.isArray(val) || val.length === 0) return '';

    const OPTS:joinOptions = Object.assign({
        delim       : ' ',      //  Delimiter to join with
        trim        : true,     //  Trim after joining
        valtrim     : true,     //  Automatically trim string values
        valround    : false,    //  Automatically round numbers
    }, Object.prototype.toString.call(opts) === '[object Object]' ? opts : {});

    const filtered = [];
    for (const el of val) {
        if (typeof el === 'string' && el.trim().length > 0) {
            filtered.push(OPTS.valtrim === true ? el.trim() : el);
        } else if (Number.isFinite(el)) {
            filtered.push(Number.isFinite(OPTS.valround) ? round(el as number, OPTS.valround) : el);
        }
    }

    return OPTS.trim === true ? filtered.join(OPTS.delim).trim() : filtered.join(OPTS.delim);
}
