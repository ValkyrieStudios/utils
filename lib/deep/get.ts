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
 * @param val - Object/Array to get the value from
 * @param path - Path string to deeply get the value at
 * @param get_parent - If passed as true retrieves the parent of where the value lives
 *
 * @returns Value stored at property or undefined
 * @throws {TypeError}
 */

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
    ) throw new TypeError('Deepget is only supported for objects');

    /* If no path is provided, do nothing */
    if (typeof path !== 'string') throw new TypeError('No path was given');

    /* Check if path contains content */
    const path_s = path.trim();
    const path_len = path_s.length;
    if (!path_len) throw new TypeError('No path was given');

    /* Cleanup paths : a.b[2].c --> ['a', 'b', '2', 'c'] (faster processing) */
    const parts: string[] = [];
    let cursor_part = '';
    let in_bracket = false;
    for (let i = 0; i < path_len; i++) {
        const char = path_s[i];

        if (char === '[' || char === ']') {
            in_bracket = !in_bracket;
            if (cursor_part) {
                parts.push(cursor_part);
                cursor_part = '';
            }
        } else if (char === '.' && !in_bracket) {
            if (cursor_part) {
                parts.push(cursor_part);
                cursor_part = '';
            }
        } else {
            cursor_part += char;
        }
    }

    if (cursor_part) parts.push(cursor_part);

    /* Return obj if no parts were passed or if only 1 part and get_parent is true */
    let len = parts.length;
    if (!len || (len === 1 && get_parent)) return obj as any;

    /* Cut last part if get_parent */
    if (get_parent) {
        parts.pop();
        len -= 1;
    }

    let cursor: any = obj;

    for (let i = 0; i < len; i++) {
        if (Array.isArray(cursor)) {
            const ix = parseInt(parts[i], 10);
            if (ix < 0 || ix > cursor.length - 1) return undefined;
            cursor = cursor[ix];
        } else if (
            Object.prototype.toString.call(cursor) === '[object Object]'
        ) {
            cursor = cursor[parts[i]];
            if (cursor === undefined) return undefined;
        } else {
            return undefined;
        }
    }

    return cursor;
}

export {deepGet, deepGet as default};
