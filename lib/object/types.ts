export type DottedKeys<T> = (
    T extends Record<string, any>
        ? {
            [K in keyof T & string]: T[K] extends Record<string, any>
                ? K | `${K}.${DottedKeys<T[K]>}`
                : K;
        }[keyof T & string]
        : string
) & string;

export type DottedKeysWithArray<T> = (
    T extends Record<string, any>
        ? {
            [K in keyof T & string]:
                T[K] extends (infer U)[]
                    ? U extends Record<string, any>
                ? K | `${K}.${DottedKeysWithArray<U>}`
                : K
            : T[K] extends Record<string, any>
                ? K | `${K}.${DottedKeysWithArray<T[K]>}`
                : K;
        }[keyof T & string]
        : string
) & string;

export type ExpandWildcard<T, P extends string> =
    P extends `*.${infer Key}`
        ? {
            [K in keyof T]: T[K] extends Record<string, any>
                ? `${K & string}.${Key}`
                : never;
        }[keyof T]
        : P;

export type ExpandWildcardWithArray<T, P extends string> =
    P extends `*.${infer Key}`
        ? {
            [K in keyof T]: T[K] extends (infer U)[]
                ? U extends Record<string, any>
                    ? `${K & string}.${Key}`
                    : never
                : T[K] extends Record<string, any>
                    ? `${K & string}.${Key}`
                    : never;
        }[keyof T]
        : P;
