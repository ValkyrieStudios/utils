/* eslint-disable complexity,max-statements,max-depth */

type ObjectType = { [key: string]: any };
type ArrayType = any[];

type DeepGetResult<T extends ObjectType | ArrayType, P extends string> =
 P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
   ? T[Key] extends ObjectType | ArrayType
    ? DeepGetResult<T[Key], Rest>
    : undefined
   : T extends ArrayType
    ? number extends keyof T
     ? DeepGetResult<T[number], Rest>
     : undefined
    : undefined
 : P extends `${infer Key}[${infer Index}]`
  ? Key extends keyof T
   ? T[Key] extends ArrayType
    ? Index extends `${number}`
     ? DeepGetResult<T[Key][number], ''>
     : undefined
    : undefined
   : T extends ArrayType
    ? number extends keyof T
     ? DeepGetResult<T[number], `[${Index}]`>
     : undefined
    : undefined
 : P extends keyof T
  ? T[P]
  : T extends ArrayType
   ? number extends keyof T
    ? T[number]
    : undefined
   : undefined;

/**
 * Get a property's value deep inside the structure of an array/object
 *
 * Example:
 * const myObj = {
 *  a: 2,
 *  b: [
 *   {price : 2},
 *   {price : 4},
 *  ],
 * };
 * deepGet(myObj, 'b[0].price');
 * Output:
 * 2
 *
 * @param {Record<string, unknown>|unknown[]} obj - Object/Array to get the value from
 * @param {string} path - Path string to deeply get the value at
 * @param {boolean} get_parent - If passed as true retrieves the parent of where the value lives
 * @throws {TypeError}
 */
function deepGet<
 T extends ObjectType | ArrayType,
 P extends string
> (
    obj: T,
    path: P,
    get_parent: boolean = false
): DeepGetResult<T, P> | undefined {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('deepGet: Requires object or array');

    /* If invalid path is provided, do nothing */
    if (
        typeof path !== 'string' ||
        !path.length
    ) throw new TypeError('deepGet: Invalid path provided');

    /* Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing) */
    const nodes: any[] = [];
    let node:any = obj;
    let key = '';
    for (let i = 0; i < path.length; i++) {
        const char = path[i];
        switch (char) {
            case '[':
            case ']':
            case '.':
                if (!key) break;
                if (Array.isArray(node)) {
                    if (!isNaN(Number(key))) {
                        const ix = parseInt(key, 10);
                        if (ix < 0 || ix > node.length - 1) return undefined;
                        node = node[ix];
                        nodes.push(node);
                    } else {
                        /* Extract from each array element */
                        const extracted = [];
                        for (let y = 0; y < node.length; y++) {
                            const el = deepGet(node[y], key);
                            if (el !== undefined) extracted.push(el);
                        }
                        node = extracted.length ? extracted : undefined;
                        nodes.push(node);
                    }
                } else if (typeof node === 'object' && node !== null) {
                    node = node[key];
                    nodes.push(node);
                    if (node === undefined) return undefined;
                }
                key = '';
                break;
            default:
                key += char;
                break;
        }
    }

    /* Push any remaining part */
    if (key) {
        if (Array.isArray(node)) {
            if (!isNaN(Number(key))) {
                const ix = parseInt(key, 10);
                if (ix < 0 || ix > node.length - 1) return undefined;
                node = node[ix];
                nodes.push(node);
            } else {
                /* Extract from each array element */
                const extracted = [];
                for (let i = 0; i < node.length; i++) {
                    const val = node[i]?.[key];
                    if (val !== undefined) extracted.push(val);
                }
                node = extracted.length ? extracted : undefined;
                nodes.push(node);
            }
        } else if (typeof node === 'object' && node !== null) {
            node = node[key];
            nodes.push(node);
            if (node === undefined) return undefined;
        } else {
            return undefined;
        }
    }

    /* Cut last part if get_parent */
    if (get_parent) nodes.pop();

    return nodes.length ? nodes.pop() : obj;
}

export {deepGet, deepGet as default};
