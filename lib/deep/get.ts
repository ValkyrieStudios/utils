/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable max-statements */
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
    if (Object.prototype.toString.call(obj) !== '[object Object]' && !Array.isArray(obj)) {
        throw new TypeError('deepGet: Requires object or array');
    }
    if (!path || typeof path !== 'string') {
        throw new TypeError('deepGet: Invalid path provided');
    }

    // Traversal State
    let cursor: any = obj;
    let parent: any = obj;

    // Tokenizer State
    let keyStart = 0;
    const len = path.length;

    // Scan Loop (We iterate up to len (inclusive) to simulate a final delimiter at the end)
    for (let i = 0; i <= len; i++) {
        // 46 == '.', 91 == '[', 93 == ']'
        const code = i === len ? 46 : path.charCodeAt(i);
        if (code === 46 || code === 91 || code === 93) {
            /*
             * If we found a delimiter but the key is empty (e.g. '..', '[]', or start '[')
             * we just skip and update the start index.
             */
            if (i === keyStart) {
                keyStart = i + 1;
                continue;
            }

            // Extract the key efficiently
            const key = path.substring(keyStart, i);
            keyStart = i + 1;

            // --- TRAVERSAL LOGIC ---

            // Save parent state before descending
            parent = cursor;

            // Specialized Array Handling
            if (Array.isArray(cursor)) {
                const idx = +key;

                // (idx === idx) is the fastest isNaN check
                if (idx === idx) {
                    cursor = cursor[idx | 0];
                } else {
                    // Wildcard Access: "users.name" -> extract 'name' from all users
                    const mapped: any[] = [];
                    const cLen = cursor.length;

                    for (let j = 0; j < cLen; j++) {
                        const item = cursor[j];
                        // Only drill into objects/arrays
                        if (item && typeof item === 'object') {
                            const val = item[key];
                            if (val !== undefined) {
                                // Flatten if the result is an array
                                if (Array.isArray(val)) {
                                    const vLen = val.length;
                                    for (let k = 0; k < vLen; k++) mapped.push(val[k]);
                                } else {
                                    mapped.push(val);
                                }
                            }
                        }
                    }

                    // If mapping found nothing, dead end.
                    if (mapped.length === 0) return undefined;
                    cursor = mapped;
                }
            } else if (cursor) {
                cursor = cursor[key];
            }

            // Dead End Check
            if (cursor === undefined) return undefined;
        }
    }

    return get_parent ? parent : cursor;
}

export {deepGet, deepGet as default};
