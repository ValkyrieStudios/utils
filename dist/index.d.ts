declare module "number/isNumericalNaN" {
    export default function isNumericalNaN(val: any): boolean;
}
declare module "equal" {
    function equal(a: any, b: any): boolean;
    export default equal;
}
declare module "array/isNotEmpty" {
    export default function isNotEmptyArray(val: any): boolean;
}
declare module "array/is" {
    export default function isArray(val: any): boolean;
}
declare module "boolean/is" {
    export default function isBoolean(val: any): boolean;
}
declare module "date/is" {
    export default function isDate(val: any): boolean;
}
declare module "function/is" {
    export default function isFunction(val: any): boolean;
}
declare module "number/is" {
    export default function isNumber(val: any): boolean;
}
declare module "number/isBetween" {
    export default function isNumberBetween(val: any, min: number, max: number): boolean;
}
declare module "number/isBelow" {
    export default function isNumberBelow(val: any, ref: number): boolean;
}
declare module "number/isBelowOrEqual" {
    export default function isNumberBelowOrEqual(val: any, ref: number): boolean;
}
declare module "number/isAbove" {
    export default function isNumberAbove(val: any, ref: number): boolean;
}
declare module "number/isAboveOrEqual" {
    export default function isNumberAboveOrEqual(val: any, ref: number): boolean;
}
declare module "number/isInteger" {
    export default function isInteger(val: any): boolean;
}
declare module "number/isIntegerBetween" {
    export default function isIntegerBetween(val: any, min: number, max: number): boolean;
}
declare module "number/isIntegerBelow" {
    export default function isIntegerBelow(val: any, ref: number): boolean;
}
declare module "number/isIntegerBelowOrEqual" {
    export default function isIntegerBelowOrEqual(val: any, ref: number): boolean;
}
declare module "number/isIntegerAbove" {
    export default function isIntegerAbove(val: any, ref: number): boolean;
}
declare module "number/isIntegerAboveOrEqual" {
    export default function isIntegerAboveOrEqual(val: any, ref: number): boolean;
}
declare module "regexp/is" {
    export default function isRegExp(val: any): boolean;
}
declare module "object/is" {
    export default function isObject(val: any): boolean;
}
declare module "object/isNotEmpty" {
    export default function isNotEmptyObject(val: any): boolean;
}
declare module "string/is" {
    export default function isString(val: any): boolean;
}
declare module "string/isBetween" {
    export default function isStringBetween(val: any, min: number, max: number, trimmed?: boolean): boolean;
}
declare module "string/isNotEmpty" {
    export default function isNotEmptyString(val: any, trimmed?: boolean): boolean;
}
declare module "is" {
    import equal from "equal";
    import isNotEmptyArray from "array/isNotEmpty";
    import isArray from "array/is";
    import isBoolean from "boolean/is";
    import isDate from "date/is";
    import isFunction from "function/is";
    import isNumber from "number/is";
    import isNumberBetween from "number/isBetween";
    import isNumberBelow from "number/isBelow";
    import isNumberBelowOrEqual from "number/isBelowOrEqual";
    import isNumberAbove from "number/isAbove";
    import isNumberAboveOrEqual from "number/isAboveOrEqual";
    import isInteger from "number/isInteger";
    import isIntegerBetween from "number/isIntegerBetween";
    import isIntegerBelow from "number/isIntegerBelow";
    import isIntegerBelowOrEqual from "number/isIntegerBelowOrEqual";
    import isIntegerAbove from "number/isIntegerAbove";
    import isIntegerAboveOrEqual from "number/isIntegerAboveOrEqual";
    import isRegExp from "regexp/is";
    import isObject from "object/is";
    import isNotEmptyObject from "object/isNotEmpty";
    import isString from "string/is";
    import isStringBetween from "string/isBetween";
    import isNotEmptyString from "string/isNotEmpty";
    const Is: Readonly<{
        Array: typeof isArray;
        NeArray: typeof isNotEmptyArray;
        NotEmptyArray: typeof isNotEmptyArray;
        Boolean: typeof isBoolean;
        Date: typeof isDate;
        Function: typeof isFunction;
        Num: typeof isNumber;
        NumBetween: typeof isNumberBetween;
        NumAbove: typeof isNumberAbove;
        NumAboveOrEqual: typeof isNumberAboveOrEqual;
        NumBelow: typeof isNumberBelow;
        NumBelowOrEqual: typeof isNumberBelowOrEqual;
        NumGt: typeof isNumberAbove;
        NumGte: typeof isNumberAboveOrEqual;
        NumLt: typeof isNumberBelow;
        NumLte: typeof isNumberBelowOrEqual;
        Number: typeof isNumber;
        NumberBetween: typeof isNumberBetween;
        NumberAbove: typeof isNumberAbove;
        NumberAboveOrEqual: typeof isNumberAboveOrEqual;
        NumberBelow: typeof isNumberBelow;
        NumberBelowOrEqual: typeof isNumberBelowOrEqual;
        Int: typeof isInteger;
        IntBetween: typeof isIntegerBetween;
        IntAbove: typeof isIntegerAbove;
        IntAboveOrEqual: typeof isIntegerAboveOrEqual;
        IntBelow: typeof isIntegerBelow;
        IntBelowOrEqual: typeof isIntegerBelowOrEqual;
        IntGt: typeof isIntegerAbove;
        IntGte: typeof isIntegerAboveOrEqual;
        IntLt: typeof isIntegerBelow;
        IntLte: typeof isIntegerBelowOrEqual;
        Integer: typeof isInteger;
        IntegerBetween: typeof isIntegerBetween;
        IntegerBelow: typeof isIntegerBelow;
        IntegerBelowOrEqual: typeof isIntegerBelowOrEqual;
        IntegerAbove: typeof isIntegerAbove;
        IntegerAboveOrEqual: typeof isIntegerAboveOrEqual;
        RegExp: typeof isRegExp;
        Object: typeof isObject;
        NeObject: typeof isNotEmptyObject;
        NotEmptyObject: typeof isNotEmptyObject;
        String: typeof isString;
        StringBetween: typeof isStringBetween;
        NeString: typeof isNotEmptyString;
        NotEmptyString: typeof isNotEmptyString;
        Equal: typeof equal;
        Eq: typeof equal;
    }>;
    export default Is;
}
declare module "hash/fnv1A" {
    export default function fnv1A(data: any, offset?: number): number;
}
declare module "array/dedupe" {
    export default function dedupe(val: any[]): any[];
}
declare module "number/round" {
    export default function round(val: number, precision?: number): number;
}
declare module "array/join" {
    interface joinOptions {
        delim?: string;
        trim?: boolean;
        valtrim?: boolean;
        valround?: number;
    }
    export default function join(val: any[], opts?: joinOptions): string;
}
declare module "array/mapFn" {
    interface mapOptions {
        merge?: boolean;
    }
    interface kvMap {
        [key: string]: {
            [key: string]: any;
        };
    }
    export default function mapFn(arr: {
        [key: string]: any;
    }[], fn: (entry: {
        [key: string]: any;
    }) => (string | number | boolean), opts?: mapOptions): kvMap;
}
declare module "array/mapKey" {
    interface mapOptions {
        merge?: boolean;
    }
    interface kvMap {
        [key: string]: {
            [key: string]: any;
        };
    }
    export default function mapKey(arr: {
        [key: string]: any;
    }[], key: string, opts?: mapOptions): kvMap;
}
declare module "array/mapPrimitive" {
    interface mapOptions {
        valtrim?: boolean;
        valround?: boolean | number;
        keyround?: boolean;
    }
    interface mapReturn {
        [key: string]: string | number;
    }
    export default function mapPrimitive(arr: any[], opts?: mapOptions): mapReturn;
}
declare module "array/shuffle" {
    export default function shuffle(arr: any[]): void;
}
declare module "array/sort" {
    interface sortOptions {
        filter_fn?: (el: any) => boolean;
        nokey_hide?: boolean;
        nokey_atend?: boolean;
    }
    interface sortObject {
        [key: string]: any;
    }
    type sortByFunction = (el: sortObject) => string;
    export default function sort(arr: sortObject[], by: string | sortByFunction, dir?: 'asc' | 'desc', opts?: sortOptions): sortObject[];
}
declare module "caching/memoize" {
    export default function memoize(fn: Function, resolver?: Function): Function;
}
declare module "date/addUTC" {
    export default function addUTC(val: Date, amount?: number, key?: 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'): Date;
}
declare module "date/diff" {
    export default function diff(val_a: Date, val_b: Date, key?: 'week' | 'weeks' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'millisecond' | 'milliseconds'): number;
}
declare module "date/endOfUTC" {
    export default function endOfUTC(val: Date, key?: 'year' | 'quarter' | 'month' | 'week' | 'week_sun' | 'week_mon' | 'week_tue' | 'week_wed' | 'week_thu' | 'week_fri' | 'week_sat' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'): Date;
}
declare module "date/nowUnix" {
    export default function nowUnix(): number;
}
declare module "date/nowUnixMs" {
    export default function nowUnixMs(): number;
}
declare module "date/startOfUTC" {
    export default function startOfUTC(val: Date, key?: 'year' | 'quarter' | 'month' | 'week' | 'week_sun' | 'week_mon' | 'week_tue' | 'week_wed' | 'week_thu' | 'week_fri' | 'week_sat' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'): Date;
}
declare module "date/toUTC" {
    export default function toUTC(val: Date): Date;
}
declare module "date/toUnix" {
    export default function toUnix(val: Date): number;
}
declare module "deep/freeze" {
    type deepInput = {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | any[];
    export default function deepFreeze(obj: deepInput): Readonly<deepInput>;
}
declare module "deep/get" {
    export default function deepGet(obj: {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | any[], path: string, get_parent?: boolean): any | undefined;
}
declare module "deep/seal" {
    type deepInput = {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | any[];
    export default function deepSeal(obj: deepInput): deepInput;
}
declare module "deep/set" {
    export default function deepSet(obj: {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | any[], path: string, value: any, define?: boolean): boolean;
}
declare module "function/noop" {
    export default function noop(): void;
}
declare module "function/noopresolve" {
    export default function noopresolve(val?: any): Promise<any>;
}
declare module "function/noopreturn" {
    export default function noopreturn(val?: any): any;
}
declare module "function/sleep" {
    export default function sleep(ms?: number): Promise<void>;
}
declare module "hash/guid" {
    export default function guid(): string;
}
declare module "number/randomBetween" {
    export default function randomBetween(min?: number, max?: number): number;
}
declare module "number/randomIntBetween" {
    export default function randomIntBetween(min?: number, max?: number): number;
}
declare module "number/toPercentage" {
    export default function toPercentage(val: number, precision?: number, min?: number, max?: number): number;
}
declare module "object/define" {
    export default function define(props: {
        [key: string]: any;
    }, obj?: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
}
declare module "object/merge" {
    function merge(target: {
        [key: string]: any;
    }, source?: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    export default merge;
}
declare module "object/pick" {
    export default function pick(obj: {
        [key: string]: any;
    }, keys: string[]): {
        [key: string]: any;
    };
}
declare module "regexp/sanitize" {
    export default function sanitizeRegExp(val: string): string | false;
}
declare module "string/humanizeNumber" {
    interface humanizeNumberOptions {
        delim?: string;
        separator?: string;
        precision?: number;
        units?: string[] | boolean;
        divider?: number;
        real?: boolean;
    }
    export default function humanizeNumber(val: number | string, options?: humanizeNumberOptions): string;
}
declare module "string/humanizeBytes" {
    interface humanizeBytesOptions {
        delim?: string;
        separator?: string;
        precision?: number;
        units?: string[];
    }
    export default function humanizeBytes(val: number | string, options?: humanizeBytesOptions): string;
}
declare module "string/shorten" {
    export default function shorten(val: string, length: number, postfix?: string): string;
}
