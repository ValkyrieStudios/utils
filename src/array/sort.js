'use strict';

import isBoolean        from '../boolean/is.js';
import isNotEmptyArray  from './isNotEmpty.js';
import isObject         from '../object/is.js';
import isNotEmptyObject from '../object/isNotEmpty.js';
import isNotEmptyString from '../string/isNotEmpty.js';
import isFunction       from '../function/is.js';

function partition (arr, start_ix, end_ix) {
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

function quickSort (arr, start_ix = 0, end_ix = arr.length - 1) {
    if (start_ix < end_ix) {
        const ix = partition(arr, start_ix, end_ix);

        quickSort(arr, start_ix, ix - 1);
        quickSort(arr, ix, end_ix);
    }

    return arr;
}

export default function sort (arr, by, dir = 'asc', options = {}) {
    if (!isNotEmptyArray(arr)) return [];

    //  Check by
    if (!isNotEmptyString(by) && !isFunction(by)) throw new Error('Sort by should be either a string or a function');

    //  Check dir
    if (dir !== 'asc' && dir !== 'desc') throw new Error('dir should be either asc or desc');

    const OPTS = {
        filter_fn   : isObject(options) && isFunction(options.filter_fn) ? options.filter_fn : isNotEmptyObject,
        nokey_hide  : isObject(options) && isBoolean(options.nokey_hide) ? options.nokey_hide : false,
        nokey_atend : isObject(options) && isBoolean(options.nokey_atend) ? options.nokey_atend : true,
    };

    //  Prepare for sort
    const prepared_arr    = [];
    const nokey_arr       = [];
    if (isNotEmptyString(by)) {
        for (const el of arr) {
            if (!OPTS.filter_fn(el)) continue;

            if (!el.hasOwnProperty(by) || el[by] === undefined) {
                nokey_arr.push(el);
            } else {
                prepared_arr.push({t: el[by], el});
            }
        }
    } else {
        let key;
        for (const el of arr) {
            if (!OPTS.filter_fn(el)) continue;

            key = by(el);
            if (key === undefined) {
                nokey_arr.push(el);
            } else {
                prepared_arr.push({t: by(el), el});
            }
        }
    }

    //  Sort
    quickSort(prepared_arr);
    if (dir === 'desc') prepared_arr.reverse();

    if (OPTS.nokey_hide) {
        return prepared_arr.map(obj => obj.el);
    } else if (OPTS.nokey_atend) {
        return [...prepared_arr.map(obj => obj.el), ...nokey_arr];
    } else {
        return [...nokey_arr, ...prepared_arr.map(obj => obj.el)];
    }
}
