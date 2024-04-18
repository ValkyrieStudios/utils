'use strict';

import isNotEmptyObject from '../object/isNotEmpty';

interface sortOptions {
    /**
     * Filter function to apply to the array before sorting
     * (default=isNotEmptyObject)
     */
    filter_fn?:(el:any) => boolean;
    /**
     * Remove objects that don't have the key or where the key is falsy
     * (default=false)
     */
    nokey_hide?:boolean;
    /**
     * Move invalid values (eg: non-objects or objects that don't match the key/function passed) to the end of the sorted array
     * (default=true)
     */
    nokey_atend?:boolean;
}

interface sortObject {
    [key:string]:any;
}

type sortByFunction = (el:sortObject) => string;

function partition (
    arr:sortObject[],
    start_ix:number,
    end_ix:number
) {
    const pivot_val = arr[Math.floor((start_ix + end_ix) / 2)].t;

    while (start_ix <= end_ix) {
        while (arr[start_ix].t < pivot_val) {
            start_ix++;
        }

        while (arr[end_ix].t > pivot_val) {
            end_ix--;
        }

        if (start_ix <= end_ix) {
            const temp = arr[start_ix];
            arr[start_ix] = arr[end_ix];
            arr[end_ix] = temp;

            start_ix++;
            end_ix--;
        }
    }

    return start_ix;
}

function quickSort (
    arr:sortObject[],
    start_ix:number = 0,
    end_ix:number = arr.length - 1
) {
    if (start_ix < end_ix) {
        const ix = partition(arr, start_ix, end_ix);

        quickSort(arr, start_ix, ix - 1);
        quickSort(arr, ix, end_ix);
    }

    return arr;
}

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
function sort (
    arr:sortObject[],
    by:string|sortByFunction,
    dir:'asc'|'desc' = 'asc',
    opts?:sortOptions
) {
    if (!Array.isArray(arr) || !arr.length) return [];

    //  Check dir
    if (dir !== 'asc' && dir !== 'desc') throw new Error('Direction should be either asc or desc');

    let NOKEY_HIDE = false;
    let NOKEY_AT_END = true;
    let FILTER_FN = isNotEmptyObject;
    if (opts && Object.prototype.toString.call(opts) === '[object Object]') {
        if (opts.nokey_hide === true) NOKEY_HIDE = true;
        if (opts.nokey_atend === false) NOKEY_AT_END = false;
        if (typeof opts.filter_fn === 'function') {
            const fn = opts.filter_fn;
            FILTER_FN = (el => isNotEmptyObject(el) && fn(el)) as (val:unknown) => val is {[key:string]:any};
        }
    }

    //  Prepare for sort
    const prepared_arr  = [];
    const nokey_arr     = [];
    if (typeof by === 'string') {
        const by_s = by.trim();
        if (!by_s.length) throw new Error('Sort by as string should contain content');

        for (const el of arr) {
            if (!FILTER_FN(el)) continue;

            if (!Object.prototype.hasOwnProperty.call(el, by_s) || el[by_s] === undefined) {
                nokey_arr.push(el);
            } else {
                prepared_arr.push({t: el[by_s], el});
            }
        }
    } else if (typeof by === 'function') {
        let key;
        for (const el of arr) {
            if (!FILTER_FN(el)) continue;

            key = by(el);
            if (key === undefined) {
                nokey_arr.push(el);
            } else {
                prepared_arr.push({t: key, el});
            }
        }
    } else {
        throw new Error('Sort by should either be a string with content or a function');
    }

    //  Sort
    quickSort(prepared_arr);
    if (dir === 'desc') prepared_arr.reverse();

    const result = [];
    if (NOKEY_HIDE) {
        for (const obj of prepared_arr) result.push(obj.el);
    } else if (NOKEY_AT_END) {
        for (const obj of prepared_arr) result.push(obj.el);
        for (const el of nokey_arr) result.push(el);
    } else {
        for (const el of nokey_arr) result.push(el);
        for (const obj of prepared_arr) result.push(obj.el);
    }
    return result;
}

export {sort, sort as default};
