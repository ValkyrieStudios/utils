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
    const result: Record<string, any> = {...obj};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof key !== 'string') continue;

        let target = result;
        const parts = key.split('.');
        const last = parts.length - 1;
        for (let j = 0; j < last; j++) {
            const part = parts[j];
            const val = target[part];

            if (Object.prototype.toString.call(val) === '[object Object]') {
                /* clone along path if necessary */
                if (target[part] === obj[part]) {
                    target[part] = {...val};
                }

                target = target[part];
            }
        }

        delete target[parts[last]];
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
