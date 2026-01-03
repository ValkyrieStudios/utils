/* eslint-disable max-statements */
/* eslint-disable complexity */

const RGX_MALICIOUS = /__proto__|constructor|prototype/;

/**
 * Sets a property and its value deep in the structure of an object
 *
 * Example:
 *  const myObj = {a: 2};
 *  deepSet(myObj, 'b.c.d.e', 4);
 * Output:
 *  {
 *      a: 2,
 *      b: {
 *          c: {
 *              d: {
 *                  e: 4
 *              }
 *          }
 *      }
 *  }
 *
 * Example:
 *  const myObj = {a: 2, b: [{price: 2}]};
 *  deepSet(myObj, 'b[0].price', 4);
 * Output:
 *  {
 *      a: 2,
 *      b: [
 *          {price: 4}
 *      ]
 *  }
 *
 * @param val - Object to set the value on
 * @param path - Path string to deeply set the value at
 * @param value - Value to set (if using defineProperty can be an accessor object)
 * @param define - Whether or not the property should be directly assigned or set using Object.defineProperty
 * @returns True or false depending on whether or not the property was set correctly
 * @throws {TypeError}
 */
function deepSet (
    obj:{[key:string]:any}|{[key:string]:any}[]|any[],
    path:string,
    value:any,
    define:boolean=false
):boolean {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        !Array.isArray(obj)
    ) throw new TypeError('Deepset is only supported for objects');

    // If no path is provided, do nothing
    if (typeof path !== 'string') throw new TypeError('No path was given');

    // Catch empty or whitespace-only strings
    if (path.trim().length === 0) {
        throw new TypeError('No path was given');
    }

    // Fail before any mutation occurs
    if (RGX_MALICIOUS.test(path)) {
        throw new TypeError('Malicious path provided');
    }

    let cursor: any = obj;
    let keyStart = 0;
    const len = path.length;
    for (let i = 0; i <= len; i++) {
        const code = i === len ? 46 : path.charCodeAt(i);

        // Delimiters: . (46), [ (91), ] (93)
        if (code === 46 || code === 91 || code === 93) {
            if (i === keyStart) {
                keyStart = i + 1;
                continue;
            }

            const key = path.substring(keyStart, i);
            keyStart = i + 1;

            // Are we at the end?
            let isEnd = i === len;
            if (!isEnd) {
                // Peek ahead to skip trailing delimiters (handle "a.b.")
                let j = i + 1;
                isEnd = true;
                for (; j < len; j++) {
                    const c = path.charCodeAt(j);
                    if (c !== 46 && c !== 91 && c !== 93) {
                        isEnd = false;
                        break;
                    }
                }
            }

            // --- FINAL ASSIGNMENT ---
            if (isEnd) {
                if (Array.isArray(cursor)) {
                    const idx = +key;
                    // Integer Check: !NaN, bitwise integer match, positive
                    if (idx !== idx || (idx | 0) !== idx || idx < 0) {
                        throw new TypeError('Invalid path provided');
                    }
                    if (define) {
                        Object.defineProperty(cursor, key, value);
                    } else {
                        cursor[idx] = value;
                    }
                } else if (define) {
                    Object.defineProperty(cursor, key, value);
                } else {
                    cursor[key] = value;
                }
                return true;
            }

            // --- TRAVERSAL ---
            let nextCursor: any;

            if (Array.isArray(cursor)) {
                const idx = +key;
                if (idx !== idx || (idx | 0) !== idx || idx < 0) {
                    throw new TypeError('Invalid path provided');
                }
                nextCursor = cursor[idx];
            } else {
                nextCursor = cursor[key];
            }

            // Create next level if missing
            if (nextCursor === undefined || nextCursor === null) {
                nextCursor = {};

                if (Array.isArray(cursor)) {
                    cursor[+key] = nextCursor;
                } else {
                    cursor[key] = nextCursor;
                }
            } else if (typeof nextCursor !== 'object') {
                // Primitive blocker (e.g. obj.a = 1, path = "a.b")
                return false;
            }

            cursor = nextCursor;
        }
    }

    return false;
}

export {deepSet, deepSet as default};
