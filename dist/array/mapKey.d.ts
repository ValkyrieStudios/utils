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
export {};
