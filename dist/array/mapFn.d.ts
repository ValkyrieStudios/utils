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
export {};
