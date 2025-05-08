import {isObject} from '../object/is';

type sortOptions <T> = {
    /**
     * Filter function to apply to the array before sorting
     * (default=isNotEmptyObject)
     */
    filter_fn?:(el:T) => boolean;
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

type sortByFunction = (el:Record<string, any>) => string;

const INSERTION_SORT_THRESHOLD = 10;

function partitionAsc (arr: [any, Record<string, any>][], low: number, high: number) {
    const pivot = arr[(low + high) >> 1][0];
    let i = low;
    let j = high;
    while (i <= j) {
        while (arr[i][0] < pivot) i++;
        while (arr[j][0] > pivot) j--;
        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    return i;
}

function quickSortAsc (arr: [any, Record<string, any>][]) {
    const stack = [[0, arr.length - 1]];
    while (stack.length) {
        const [low, high] = stack.pop() as number[];
        if (high - low <= INSERTION_SORT_THRESHOLD) {
            for (let i = low + 1; i <= high; i++) {
                const key = arr[i];
                let j = i - 1;
                while (j >= low && arr[j][0] > key[0]) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;
            }
        } else {
            const p = partitionAsc(arr, low, high);
            if (p - 1 > low) stack.push([low, p - 1]);
            if (p < high) stack.push([p, high]);
        }
    }
}

function partitionDesc (arr: [any, Record<string, any>][], low: number, high: number) {
    const pivot = arr[(low + high) >> 1][0];
    let i = low;
    let j = high;

    while (i <= j) {
        while (arr[i][0] > pivot) i++;
        while (arr[j][0] < pivot) j--;

        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    return i;
}

function quickSortDesc (arr: [any, Record<string, any>][]) {
    const stack = [[0, arr.length - 1]];
    while (stack.length) {
        const [low, high] = stack.pop() as number[];
        if (high - low <= INSERTION_SORT_THRESHOLD) {
            for (let i = low + 1; i <= high; i++) {
                const key = arr[i];
                let j = i - 1;
                while (j >= low && arr[j][0] < key[0]) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;
            }
        } else {
            const p = partitionDesc(arr, low, high);
            if (p - 1 > low) stack.push([low, p - 1]);
            if (p < high) stack.push([p, high]);
        }
    }
}

/**
 * Sort an array of objects.
 *
 * The internals of this function swap between insertion and quicksort depending on the use-case.
 * Insertion sort is used for smaller arrays and quicksort is used for larger arrays.
 *
 * The threshold for insertion sort is 10 elements.
 *
 * The quicksort implementation is based on Tony Hoare's quicksort
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
 * @param {Array} val - Array to sort
 * @param {string|sortByFunction} by - Either a string (key) or a function
 * @param {'desc'|'asc'} dir - (default='asc') Direction to sort in (asc or desc)
 * @param {sortOptions} opts - Sort options
 * @throws {Error}
 */
function sort <T extends {[key:string]:any}> (
    arr:T[],
    by:string|sortByFunction,
    dir:'asc'|'desc' = 'asc',
    opts?:sortOptions<T>
) {
    if (!Array.isArray(arr)) return [] as unknown as T[];

    const len = arr.length;
    if (!len) return [] as unknown as T[];

    const NOKEY_HIDE = opts?.nokey_hide === true;
    const NOKEY_AT_END = opts?.nokey_atend !== false;
    let FILTER_FN = isObject;
    if (typeof opts?.filter_fn === 'function') {
        const fn = opts.filter_fn;
        /* eslint-disable-next-line */
        /* @ts-ignore */
        FILTER_FN = (el => isObject(el) && fn(el)) as (val:unknown) => val is {[key:string]:any};
    }

    /* Determine sort by behavior */
    const by_type = typeof by;
    let BY_FN:sortByFunction;
    switch (by_type) {
        case 'function':
            BY_FN = by as sortByFunction;
            break;
        case 'string':
            if (!by.length) throw new Error('Sort by as string should contain content');
            BY_FN = ((val:T) => val?.[by as string]) as sortByFunction;
            break;
        default:
            throw new Error('Sort by should either be a string with content or a function');
    }

    /* Prepare for sort */
    const tosort_arr:[any,T][] = [];
    const noval_arr:T[] = [];
    for (let i = 0; i < len; i++) {
        const el = arr[i];
        if (FILTER_FN(el)) {
            const val = BY_FN(el);
            if (val === undefined) noval_arr.push(el);
            else tosort_arr.push([val, el]);
        }
    }

    /* Sort */
    if (dir === 'desc') quickSortDesc(tosort_arr);
    else quickSortAsc(tosort_arr);

    /* Construct Result */
    const rslt = [];
    if (!NOKEY_HIDE && !NOKEY_AT_END) rslt.push(...noval_arr);
    for (let i = 0; i < tosort_arr.length; i++) rslt.push(tosort_arr[i][1]);
    if (!NOKEY_HIDE && NOKEY_AT_END) rslt.push(...noval_arr);

    return rslt as T[];
}

export {sort, sort as default};
