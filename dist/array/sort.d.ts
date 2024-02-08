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
export {};
