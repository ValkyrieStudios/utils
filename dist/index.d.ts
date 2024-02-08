declare module "number/isNumericalNaN" {
    /**
     * Check whether or not the provided value is a numerical NaN
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a numerical NaN
     */
    export default function isNumericalNaN(val: any): boolean;
}
declare module "equal" {
    /**
     * Compute whether or not two provided values are deeply equal
     *
     * @param a - Value to compare against
     * @param b - Value to compare with
     *
     * @returns Whether or not they are equal
     */
    function equal(a: any, b: any): boolean;
    export default equal;
}
declare module "array/isNotEmpty" {
    /**
     * Check whether or not a provided value is an array with content
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is an array with content
     */
    export default function isNotEmptyArray(val: any): boolean;
}
declare module "array/is" {
    /**
     * Check whether or not a provided value is an array
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is an array
     */
    export default function isArray(val: any): boolean;
}
declare module "boolean/is" {
    /**
     * Check whether or not a provided value is a boolean
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a boolean
     */
    export default function isBoolean(val: any): boolean;
}
declare module "date/is" {
    /**
     * Check whether or not a provided value is a Date
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a Date
     */
    export default function isDate(val: any): boolean;
}
declare module "function/is" {
    /**
     * Check whether or not a provided value is a Function
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a Function
     */
    export default function isFunction(val: any): boolean;
}
declare module "number/is" {
    /**
     * Check whether or not a provided value is a number
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a number
     */
    export default function isNumber(val: any): boolean;
}
declare module "number/isBetween" {
    /**
     * Check whether or not the provided value is a number between a min and max
     * inclusive of min and max
     * equal to another value
     *
     * @param val - Value to verify
     * @param min - Lower boundary
     * @param max - Upper boundary
     *
     * @returns Whether or not the value is a number between min and max inclusive
     */
    export default function isNumberBetween(val: any, min: number, max: number): boolean;
}
declare module "number/isBelow" {
    /**
     * Check whether or not the provided value is a number below another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be below
     *
     * @returns Whether or not the value is below the reference
     */
    export default function isNumberBelow(val: any, ref: number): boolean;
}
declare module "number/isBelowOrEqual" {
    /**
     * Check whether or not the provided value is a number below or
     * equal to another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be below or equal to
     *
     * @returns Whether or not the value is below or equal to the reference
     */
    export default function isNumberBelowOrEqual(val: any, ref: number): boolean;
}
declare module "number/isAbove" {
    /**
     * Check whether or not the provided value is a number above another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be above
     *
     * @returns Whether or not the value is above the reference
     */
    export default function isNumberAbove(val: any, ref: number): boolean;
}
declare module "number/isAboveOrEqual" {
    /**
     * Check whether or not the provided value is a number above or equal to another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be above or equal to
     *
     * @returns Whether or not the value is above or equal to the reference
     */
    export default function isNumberAboveOrEqual(val: any, ref: number): boolean;
}
declare module "number/isInteger" {
    /**
     * Check whether or not a provided value is an integer
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is an integer
     */
    export default function isInteger(val: any): boolean;
}
declare module "number/isIntegerBetween" {
    /**
     * Check whether or not the provided value is an integer between a min and max
     * inclusive of min and max
     * equal to another value
     *
     * @param val - Value to verify
     * @param min - Lower boundary
     * @param max - Upper boundary
     *
     * @returns Whether or not the value is an integer between min and max inclusive
     */
    export default function isIntegerBetween(val: any, min: number, max: number): boolean;
}
declare module "number/isIntegerBelow" {
    /**
     * Check whether or not the provided value is an integer below another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be below
     *
     * @returns Whether or not the value is below the reference
     */
    export default function isIntegerBelow(val: any, ref: number): boolean;
}
declare module "number/isIntegerBelowOrEqual" {
    /**
     * Check whether or not the provided value is an integer below or
     * equal to another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be below or equal to
     *
     * @returns Whether or not the value is below or equal to the reference
     */
    export default function isIntegerBelowOrEqual(val: any, ref: number): boolean;
}
declare module "number/isIntegerAbove" {
    /**
     * Check whether or not the provided value is an integer above another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be above
     *
     * @returns Whether or not the value is above the reference
     */
    export default function isIntegerAbove(val: any, ref: number): boolean;
}
declare module "number/isIntegerAboveOrEqual" {
    /**
     * Check whether or not the provided value is an integer above or equal
     * to another value
     *
     * @param val - Value to verify
     * @param ref - Reference the provided value needs to be above or equal to
     *
     * @returns Whether or not the value is above or equal to the reference
     */
    export default function isIntegerAboveOrEqual(val: any, ref: number): boolean;
}
declare module "regexp/is" {
    /**
     * Check whether or not a provided value is a RegExp instance
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a RegExp
     */
    export default function isRegExp(val: any): boolean;
}
declare module "object/is" {
    /**
     * Check whether or not a provided value is an object
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is an object
     */
    export default function isObject(val: any): boolean;
}
declare module "object/isNotEmpty" {
    /**
     * Check whether or not a provided value is an object with content
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is an object with content
     */
    export default function isNotEmptyObject(val: any): boolean;
}
declare module "string/is" {
    /**
     * Check whether or not a provided value is a string
     *
     * @param val - Value to verify
     *
     * @returns Whether or not the value is a string
     */
    export default function isString(val: any): boolean;
}
declare module "string/isBetween" {
    /**
     * Check whether or not the provided value is a string of length between a min and max
     * inclusive of min and max
     * equal to another value
     *
     * @param val - Value to verify
     * @param min - Lower boundary
     * @param max - Upper boundary
     * @param trimmed  - (default=true) Trim the string or not
     *
     * @returns Whether or not the value is a string of length between min and max inclusive
     */
    export default function isStringBetween(val: any, min: number, max: number, trimmed?: boolean): boolean;
}
declare module "string/isNotEmpty" {
    /**
     * Check whether or not a provided value is a string with content
     *
     * @param val - Value to verify
     * @param trimmed  - (default=true) Trim the string or not
     *
     * @returns Whether or not the value is a string with content
     */
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
    /**
     * Convert a provided value into a Fowler-Noll-Vo 1A hash
     * For more info: https://tools.ietf.org/html/draft-eastlake-fnv-03
     *
     * @param data - Value to be converted
     * @param offset - (default=2166136261) FNV prime to use
     *
     * @returns FNV1A hash of provided value
     */
    export default function fnv1A(data: any, offset?: number): number;
}
declare module "array/dedupe" {
    /**
     * Dedupes the provided array
     *
     * @param val - Array to dedupe
     *
     * @returns Deduped array
     */
    export default function dedupe(val: any[]): any[];
}
declare module "number/round" {
    /**
     * Rounds the provided value to a certain precision
     *
     * @param val - Value to round
     * @param precision - (default=0) Amount of decimals precision to round to
     *
     * @returns Rounded value according to decimal precision provided
     */
    export default function round(val: number, precision?: number): number;
}
declare module "array/join" {
    interface joinOptions {
        /**
         * Delimiter to join with
         * (default=' ')
         * eg: join(['hello', 'world', {delim: '_'}]) -> 'hello_world'
         */
        delim?: string;
        /**
         * Trim after joining or not
         * (default=true)
         * eg: join(['  hello', 'world  '], {trim: true}) -> 'hello world'
         */
        trim?: boolean;
        /**
         * Automatically trim all string values
         * (default=true)
         * eg: join([' hello   ', ' world '], {valtrim: true}) -> 'hello world'
         */
        valtrim?: boolean;
        /**
         * Automatically round all numeric values
         * (default=false)
         * eg: join([5.432, 'world', 1.2], {valround: 1}) -> '5.4 world 1.2'
         */
        valround?: number;
    }
    /**
     * Join an array of values while autofiltering any non-string/non-number elements
     *
     * @param val - Array of values to join
     * @param opts - Join options
     *
     * @returns Joined array as string
     */
    export default function join(val: any[], opts?: joinOptions): string;
}
declare module "array/mapFn" {
    interface mapOptions {
        /**
         * Allow merging existing keys or not, if not keys will be overriden if they exist
         * (default=false)
         *
         * Example:
         *  mapFn([{uid: 12, a: 'hi'}, {uid: 12, b: 'ho'}], el => el.uid, {merge: true})
         * Output:
         *  {12: {uid: 12, a: 'hi', b: 'ho'}}
         * Output if merge is false
         *  {12: {uid: 12, b: 'ho'}}
         */
        merge?: boolean;
    }
    interface kvMap {
        [key: string]: {
            [key: string]: any;
        };
    }
    /**
     * Map an object array into a kv-object through a function that generates a key. Returning a non-string,
     * non-numeric value from the function (eg: false) will filter out the object.
     *
     * Example:
     *  mapFn([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], el => el.uid);
     * Output:
     *  {12: {uid: 12, name: 'Peter'}, 15: {uid: 15, name: 'Jonas'}}
     *
     * @param val - Array to map
     * @param fn - Handler function which is run for each of the objects and should return a string or number
     * @param opts - Options object to override built-in defaults
     *
     * @returns KV-Map object
     */
    export default function mapFn(arr: {
        [key: string]: any;
    }[], fn: (entry: {
        [key: string]: any;
    }) => (string | number | boolean), opts?: mapOptions): kvMap;
}
declare module "array/mapKey" {
    interface mapOptions {
        /**
         * Allow merging existing keys or not, if not keys will be overriden if they exist
         * (default=false)
         *
         * Example:
         *  mapKey([{uid: 12, a: 'hi'}, {uid: 12, b: 'ho'}], 'uid', {merge: true})
         * Output:
         *  {12: {uid: 12, a: 'hi', b: 'ho'}}
         * Output if merge is false
         *  {12: {uid: 12, b: 'ho'}}
         */
        merge?: boolean;
    }
    interface kvMap {
        [key: string]: {
            [key: string]: any;
        };
    }
    /**
     * Map an object array into a kv-object by passing a common key that exists on the objects. Objects for
     * which the key doesn't exist will be filtered out automatically
     *
     * Example:
     *  mapKey([{uid: 12, name: 'Peter'}, {uid: 15, name: 'Jonas'}], 'uid');
     * Output:
     *  {12: {uid: 12, name: 'Peter'}, 15: {uid: 15, name: 'Jonas'}}
     *
     * @param val - Array to map
     * @param key - Key to map by
     * @param opts - Options object to override built-in defaults
     *
     * @returns KV-Map object
     */
    export default function mapKey(arr: {
        [key: string]: any;
    }[], key: string, opts?: mapOptions): kvMap;
}
declare module "array/mapPrimitive" {
    interface mapOptions {
        /**
         * Automatically trim all string values
         * (default=false)
         * eg: join([' hello   ', ' world '], {valtrim: true}) -> 'hello world'
         */
        valtrim?: boolean;
        /**
         * Automatically round all numeric values
         * (default=false)
         * eg: mapPrimitive([5.432, 5.4, 5.43, 4.2, 4.1], {valround: true}) -> {'5.432': 5, '5.4': 5, '5.43': 5, '4.2': 4, '4.1': 4}
         * eg: mapPrimitive([5.432, 5.43, 4.21, 4.1], {valround: 1}) -> {'5.432': 5.4, '5.43': 5.4, '4.21': 4.2, '4.1': 4.1}
         */
        valround?: boolean | number;
        /**
         * Automaticaly round all keys from numeric values
         * (default=false)
         * eg: mapPrimitive([5.432, 5.4, 5.43, 4.2, 4.1], {keyround: true}) -> {5: 5.43, 4: 4.1}
         */
        keyround?: boolean;
    }
    interface mapReturn {
        [key: string]: string | number;
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
    export default function mapPrimitive(arr: any[], opts?: mapOptions): mapReturn;
}
declare module "array/shuffle" {
    /**
     * Shuffle an array using a Fisher-Yates shuffle O(n)
     * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
     *
     * Take Note: The passed array will be changed and edited in place
     *
     * @param val - Array to shuffle
     */
    export default function shuffle(arr: any[]): void;
}
declare module "array/sort" {
    interface sortOptions {
        /**
         * Filter function to apply to the array before sorting
         * (default=isNotEmptyObject)
         */
        filter_fn?: (el: any) => boolean;
        /**
         * Remove objects that don't have the key or where the key is falsy
         * (default=false)
         */
        nokey_hide?: boolean;
        /**
         * Move invalid values (eg: non-objects or objects that don't match the key/function passed) to the end of the sorted array
         * (default=true)
         */
        nokey_atend?: boolean;
    }
    interface sortObject {
        [key: string]: any;
    }
    type sortByFunction = (el: sortObject) => string;
    /**
     * Sort an array of objects, uses an implementation of Tony Hoare's quicksort
     * (https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/tony-hoare/quicksort.html)
     *
     * Example:
     *  sort([
     *      {test: 'Peter'},
     *      {test: 'Jack'},
     *      {test: 'Pony'},
     *      {test: 'John'},
     *      {test: 'Joe'},
     *      {test: 'Bob'},
     *      {test: 'Alice'},
     *  ], 'test', 'desc');
     * Output:
     *  [{test: 'Pony'}, {test: 'Peter'}, {test: 'John'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
     *
     * Example w/ Function:
     *  sort([
     *      {test: 'Peter'},
     *      {test: 'Pony'},
     *      {test: 'JOHn'},
     *      {test: 'Joe'},
     *  ], el => el.test.toLowerCase(), 'desc');
     * Output:
     *  [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}]
     *
     * @param val - Array to sort
     * @param by - Either a string (key) or a function
     * @param dir - (default='asc') Direction to sort in (asc or desc)
     * @param opts - Sort options
     *
     * @returns Sorted array
     * @throws {Error}
     */
    export default function sort(arr: sortObject[], by: string | sortByFunction, dir?: 'asc' | 'desc', opts?: sortOptions): sortObject[];
}
declare module "caching/memoize" {
    /**
     * Turn a function into a memoized function. An optional resolver function can be passed which allows custom cache key generation.
     *
     * Example:
     *  const memoized_function = memoize((a) => fnv1A(a));
     *
     * @param fn - Function to memoize
     * @param resolver - Optional resolver function to generate cache key. If not passed the first argument is used as map key
     */
    export default function memoize(fn: Function, resolver?: Function): Function;
}
declare module "date/addUTC" {
    /**
     * Adds the provided amount of a specific key to the provided date
     *
     * @param val - Date to set to end of
     * @param amount - (default=0) Amount of key to add
     * @param key - (default='millisecond') Key to set
     *
     * @returns New date with provided amount of key added
     */
    export default function addUTC(val: Date, amount?: number, key?: 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'): Date;
}
declare module "date/diff" {
    /**
     * Compute the diff between two dates in the provided key
     *
     * @param val_a - Date to diff against
     * @param val_b - Date to diff with
     * @param key - (default='millisecond') Key to diff in
     *
     * @returns Numerical diff between two dates
     */
    export default function diff(val_a: Date, val_b: Date, key?: 'week' | 'weeks' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'millisecond' | 'milliseconds'): number;
}
declare module "date/endOfUTC" {
    /**
     * Sets the provided date to end of UTC of provided key
     *
     * @param val - Date to set to end of
     * @param key - (default='millisecond') Key to set
     *
     * @returns New date set to end of key
     */
    export default function endOfUTC(val: Date, key?: 'year' | 'quarter' | 'month' | 'week' | 'week_sun' | 'week_mon' | 'week_tue' | 'week_wed' | 'week_thu' | 'week_fri' | 'week_sat' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'): Date;
}
declare module "date/nowUnix" {
    /**
     * Compute the current unix timestamp in seconds
     *
     * @returns Current unix timestamp in seconds
     */
    export default function nowUnix(): number;
}
declare module "date/nowUnixMs" {
    /**
     * Compute the current unix timestamp in milliseconds
     *
     * @returns Current unix timestamp in milliseconds
     */
    export default function nowUnixMs(): number;
}
declare module "date/startOfUTC" {
    /**
     * Sets the provided date to start of UTC of provided key
     *
     * @param val - Date to set to start of
     * @param key - (default='millisecond') Key to set
     *
     * @returns New date set to start of key
     */
    export default function startOfUTC(val: Date, key?: 'year' | 'quarter' | 'month' | 'week' | 'week_sun' | 'week_mon' | 'week_tue' | 'week_wed' | 'week_thu' | 'week_fri' | 'week_sat' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'): Date;
}
declare module "date/toUTC" {
    /**
     * Sets a passed date to UTC
     *
     * @param val - Date to set to UTC
     *
     * @returns New date object set to the UTC contents of the passed date
     */
    export default function toUTC(val: Date): Date;
}
declare module "date/toUnix" {
    /**
     * Returns the unix time in seconds of the passed date
     *
     * @param val - Date to get the unix time for
     *
     * @returns Unix time in seconds
     */
    export default function toUnix(val: Date): number;
}
declare module "deep/freeze" {
    type deepInput = {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | any[];
    /**
     * Recursively freezes all properties of an object
     *
     * @param obj - Object to deep freeze
     *
     * @returns Deeply frozen object
     */
    export default function deepFreeze(obj: deepInput): Readonly<deepInput>;
}
declare module "deep/get" {
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
    /**
     * Recursively seals all properties of an object
     *
     * @param obj - Object to deep seal
     *
     * @returns Deeply sealed object
     */
    export default function deepSeal(obj: deepInput): deepInput;
}
declare module "deep/set" {
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
    export default function deepSet(obj: {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[] | any[], path: string, value: any, define?: boolean): boolean;
}
declare module "function/noop" {
    /**
     * No-Operation (noop) function that does nothing and simply returns.
     *
     * @returns Void
     */
    export default function noop(): void;
}
declare module "function/noopresolve" {
    /**
     * No-Operation (noop) resolver that simply returns a promise
     * that resolves with the value that was passed to it
     *
     * @param val - Value to be resolved with
     *
     * @returns Promise that resolves with passed value
     */
    export default function noopresolve(val?: any): Promise<any>;
}
declare module "function/noopreturn" {
    /**
     * No-Operation (noop) function that returns the value passed to it when called.
     *
     * @param val - Value to return
     *
     * @returns Passed value
     */
    export default function noopreturn(val?: any): any;
}
declare module "function/sleep" {
    /**
     * Returns a promise that resolves after X milliseconds, useful in
     * async scenarios where we wish to wait for a specific periodic of time
     *
     * @param ms - (default=1000) Amount of milliseconds to wait for
     *
     * @returns Promise that resolves after X milliseconds
     */
    export default function sleep(ms?: number): Promise<void>;
}
declare module "hash/guid" {
    /**
     * Generate a unique identifier (guid) according to RFC4122
     *
     * @returns Generated guid string
     */
    export default function guid(): string;
}
declare module "number/randomBetween" {
    /**
     * Generates a random number between the provided lower and upper bound
     *
     * @param min - (default=0) Lower bound
     * @param max - (default=10) Upper bound
     *
     * @returns Random number between min and max
     */
    export default function randomBetween(min?: number, max?: number): number;
}
declare module "number/randomIntBetween" {
    /**
     * Generates a random integer between the provided lower and upper bound,
     * not inclusive of the upper bound
     *
     * @param min - (default=0) Lower bound
     * @param max - (default=10) Upper bound
     *
     * @returns Random integer between min and max
     */
    export default function randomIntBetween(min?: number, max?: number): number;
}
declare module "number/toPercentage" {
    /**
     * Converts a number into a percentage respective to a provided range
     *
     * @param val - Value to convert into a percentage for the provided range
     * @param precision - (default=0) Amount of decimals precision to use
     * @param min - (default=0) Lower bound of the range the value is to be converted to percentage for
     * @param max - (default=1) Upper bound of the range the value is to be converted to percentage for
     *
     * @returns Percentage value respective to the provided range
     */
    export default function toPercentage(val: number, precision?: number, min?: number, max?: number): number;
}
declare module "object/define" {
    /**
     * Defines each of the provided properties in props on top of the passed object
     *
     * @param props - Object with properties to define
     * @param obj - (default={}) Object to define on top of
     *
     * @returns Object with the defined properties
     */
    export default function define(props: {
        [key: string]: any;
    }, obj?: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
}
declare module "object/merge" {
    /**
     * Deep merge two objects together while ensuring nested objects also get merged,
     * take note: this does not merge onto passed objects by reference but instead
     * returns a new object
     *
     * @param target - Base Object
     * @param source - (default={}) Object to merge onto base object
     *
     * @returns Combined target and source objects
     */
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
    /**
     * Returns a new object with the keys picked from the passed object
     *
     * @param obj - Object to pick from
     * @param keys - Array of keys to pick from object
     *
     * @returns Object containing the picked keys from source object
     */
    export default function pick(obj: {
        [key: string]: any;
    }, keys: string[]): {
        [key: string]: any;
    };
}
declare module "regexp/sanitize" {
    /**
     * Sanitize the provided string input for safe usage within a RegExp, this
     * ensures automatic escaping of characters that have special meaning in regexp.
     *
     * For more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
     *
     * @param val - Value to sanitize
     *
     * @returns Sanitized value
     */
    export default function sanitizeRegExp(val: string): string | false;
}
declare module "string/humanizeNumber" {
    interface humanizeNumberOptions {
        /**
         *  Delimiter used
         *  (default=',')
         *  eg: 20000 -> 20,000
         */
        delim?: string;
        /**
         * Separator used for floats
         * (default='.')
         * eg: 20.034 -> 20,034
         */
        separator?: string;
        /**
         * Decimal precision for floats
         * (default=2)
         * eg: 20.0344233 with precision 2 -> 20.03
         */
        precision?: number;
        /**
         * Units used for conversion
         * default=['', 'k', 'm', 'b', 't', 'q'])
         * eg: 1073741823 with units ['', 'K']` -> 1.073.741,82K
         */
        units?: string[] | boolean;
        /**
         * Override default divider used for units
         * (default=1000)
         * eg: humanizeBytes uses 1024 as divider
         */
        divider?: number;
        /**
         * Set to true to automatically round input numbers
         * (default=false)
         */
        real?: boolean;
    }
    /**
     * Humanize a number
     *
     * Examples:
     *	humanizeNumber(1504230); // '1.5m'
     *	humanizeNumber('-1500'); // '-1.5k'
     *	humanizeNumber(47328748923747923479); // '47,328.75q'
     *
     * @param val - Number or string value to humanize (string should be convertible to a number)
     * @param opts - (default={}) Pass to override options.
     *
     * @returns Humanized number as string
     */
    export default function humanizeNumber(val: number | string, options?: humanizeNumberOptions): string;
}
declare module "string/humanizeBytes" {
    interface humanizeBytesOptions {
        /**
         * Delimiter used
         * (default=',')
         * eg: 20000 -> 20,000
         */
        delim?: string;
        /**
         * Separator used for floats
         * (default='.')
         * eg: 20.034 -> 20,034
         */
        separator?: string;
        /**
         * Decimal precision for floats
         * (default=2)
         * eg: 20.0344233 with precision 2 -> 20.03
         */
        precision?: number;
        /**
         * Units used for conversion
         * (default=['', 'k', 'm', 'b', 't', 'q'])
         * eg: 1073741823 with units ['', 'K']` -> 1.073.741,82K
         */
        units?: string[];
    }
    /**
     * Humanize a numerical byte value into a humanly readable file size
     *
     * Examples:
     * 	humanizeBytes(23); // '23 bytes'
     * 	humanizeBytes(-374237489237); // '-348.5 GB'
     *
     * @param val - Number or string byte value to humanize (string should be convertible to a number)
     * @param opts - (default={}) Pass to override options.
     *
     * @returns Humanized byte value as string
     */
    export default function humanizeBytes(val: number | string, options?: humanizeBytesOptions): string;
}
declare module "string/shorten" {
    /**
     * Shorten a string and add a postfix if it goes over a specific length, will autotrim value.
     *
     * @param val - String value to shorten
     * @param length - Length to shorten it to
     * @param postfix - (default='...') Postfix to use in case the string got shortened
     *
     * @returns Shortened string
     */
    export default function shorten(val: string, length: number, postfix?: string): string;
}
