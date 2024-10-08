import {round} from '../number/round';
import {isIntegerAboveOrEqual} from '../number/isIntegerAboveOrEqual';

const SPACE_RGX = /(\s)+/g;

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
     * Trim internals of values or not
     * (default=false)
     * eg: join(['   hello    world', 'this   is ', 'Peter'], {trimBetween: true, trim: true}) -> 'hello world this is peter'
     */
    innertrim?:boolean;
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
 */
function join (val:unknown[], opts?:joinOptions):string {
    if (!Array.isArray(val) || !val.length) return '';

    const DELIM:string = typeof opts?.delim === 'string' ? opts.delim : ' ';
    const TRIM: boolean = opts?.trim ?? true;
    const VALTRIM: boolean = opts?.valtrim ?? true;
    const INNERTRIM: boolean = opts?.innertrim ?? false;
    const VALROUND: number | false = isIntegerAboveOrEqual(opts?.valround, 0) ? opts!.valround! : false;

    let result = '';
    let hasVal:boolean = false;
    for (let i = 0; i < val.length; i++) {
        const el = val[i];
        if (typeof el === 'string') {
            const trimmed = el.trim();
            if (!trimmed) continue;
            const n_el = VALTRIM ? trimmed : el;
            result = result + (hasVal ? DELIM : '') + (INNERTRIM ? n_el.replace(SPACE_RGX, ' ') : n_el);
            hasVal = true;
        } else if (Number.isFinite(el)) {
            result = result + (hasVal ? DELIM : '') + (VALROUND !== false ? round(el as number, VALROUND) : el);
            hasVal = true;
        }
    }

    return TRIM ? result.trim() : result;
}

export {join, join as default};
