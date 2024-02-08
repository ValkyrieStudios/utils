type deepInput = {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[];
/**
 * Recursively freezes all properties of an object
 *
 * @param obj - Object to deep freeze
 *
 * @returns Deeply frozen object
 */
export default function deepFreeze(obj: deepInput): Readonly<deepInput>;
export {};
