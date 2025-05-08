type ObjectType = { [key: string]: any };

type DottedKeys<T> = (
  T extends ObjectType
    ? {
        [K in keyof T & string]: T[K] extends ObjectType
          ? K | `${K}.${DottedKeys<T[K]>}`
          : K;
      }[keyof T & string]
    : string
) & string;

type OmitFromObject<T, K extends string> = K extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? T[Key] extends ObjectType
      ? { [P in keyof T]: P extends Key ? OmitFromObject<T[Key], Rest> : T[P] }
      : T
    : T
  : Omit<T, K>;

function innerOmit (obj:Record<string, any>, keys:string[]) {
    const result: any = {...obj};

    /* Group keys by top-level property */
    const groups: Record<string, string[]> = {};
    for (let i = 0; i < keys.length; i++) {
        if (typeof keys[i] === 'string') {
            const [root, ...rest] = keys[i].split('.');

            if (rest.length) {
                if (!groups[root]) groups[root] = [];
                groups[root].push(rest.join('.'));
            } else {
                /* Remove top-level prop */
                delete result[root];
            }
        }
    }

    /* Process each top-level property group */
    for (const root in groups) {
        if (
            typeof result[root] === 'object' &&
            result[root] !== null
        ) result[root] = innerOmit(result[root], groups[root]);
    }

    return result;
}

/**
 * Returns a new object with the keys omitted from the passed object, handling nested keys recursively
 *
 * @param {Record<string, any>} obj - Object to omit from
 * @param {string[]} keys - Array of keys to omit from object
 */
function omit<T extends Record<string, any>, K extends readonly DottedKeys<T>[]> (
    obj: T,
    keys: K
): OmitFromObject<T, K[number]> {
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' ||
        !Array.isArray(keys)
    ) throw new TypeError('Please pass an object to omit from and a keys array');

    return innerOmit(obj, keys) as OmitFromObject<T, K[number]>;
}

export {omit, omit as default};
