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
    const parts: string[] = [];
    let cursor_part = '';
    let in_bracket = false;
    for (let i = 0; i < path.length; i++) {
        const char = path[i];
        switch (char) {
            case '[':
            case ']':
            case '.':
                in_bracket = !in_bracket;
                if (!cursor_part) break;
                parts.push(cursor_part);
                cursor_part = '';
                break;
            default:
                cursor_part += char;
                break;
        }
    }

    /* Push any remaining part */
    if (cursor_part) parts.push(cursor_part);

    /* Cut last part if get_parent */
    if (get_parent) parts.pop();

    let cursor: any = obj;
    for (let i = 0; i < parts.length; i++) {
        if (Array.isArray(cursor)) {
            const ix = parseInt(parts[i], 10);
            if (ix < 0 || ix > cursor.length - 1) return undefined;
            cursor = cursor[ix];
        } else if (typeof cursor === 'object' && cursor !== null) {
            cursor = cursor[parts[i]];
            if (cursor === undefined) return undefined;
        } else {
            return undefined;
        }
    }

    return cursor;
}

export {deepGet, deepGet as default};
