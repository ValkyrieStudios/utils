'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("../boolean/is"));
const isNotEmpty_1 = __importDefault(require("../object/isNotEmpty"));
function partition(arr, start_ix, end_ix) {
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
function quickSort(arr, start_ix = 0, end_ix = arr.length - 1) {
    if (start_ix < end_ix) {
        const ix = partition(arr, start_ix, end_ix);
        quickSort(arr, start_ix, ix - 1);
        quickSort(arr, ix, end_ix);
    }
    return arr;
}
function sort(arr, by, dir = 'asc', opts = {}) {
    if (!Array.isArray(arr) || arr.length === 0)
        return [];
    if (dir !== 'asc' && dir !== 'desc')
        throw new Error('Direction should be either asc or desc');
    const has_opts = Object.prototype.toString.call(opts) === '[object Object]';
    const OPTS = {
        filter_fn: has_opts && typeof opts.filter_fn === 'function'
            ? el => (0, isNotEmpty_1.default)(el) && opts.filter_fn(el)
            : isNotEmpty_1.default,
        nokey_hide: has_opts && (0, is_1.default)(opts.nokey_hide) ? opts.nokey_hide : false,
        nokey_atend: has_opts && (0, is_1.default)(opts.nokey_atend) ? opts.nokey_atend : true,
    };
    const prepared_arr = [];
    const nokey_arr = [];
    if (typeof by === 'string') {
        const by_s = by.trim();
        if (by_s.length === 0)
            throw new Error('Sort by should either be a string with content or a function');
        for (const el of arr) {
            if (!OPTS.filter_fn(el))
                continue;
            if (!Object.prototype.hasOwnProperty.call(el, by_s) || el[by_s] === undefined) {
                nokey_arr.push(el);
            }
            else {
                prepared_arr.push({ t: el[by_s], el });
            }
        }
    }
    else if (typeof by === 'function') {
        let key;
        for (const el of arr) {
            if (!OPTS.filter_fn(el))
                continue;
            key = by(el);
            if (key === undefined) {
                nokey_arr.push(el);
            }
            else {
                prepared_arr.push({ t: by(el), el });
            }
        }
    }
    else {
        throw new Error('Sort by should either be a string with content or a function');
    }
    quickSort(prepared_arr);
    if (dir === 'desc')
        prepared_arr.reverse();
    if (OPTS.nokey_hide) {
        return prepared_arr.map(obj => obj.el);
    }
    else if (OPTS.nokey_atend) {
        return [...prepared_arr.map(obj => obj.el), ...nokey_arr];
    }
    else {
        return [...nokey_arr, ...prepared_arr.map(obj => obj.el)];
    }
}
exports.default = sort;
