type deepInput = {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[];
/**
 * Recursively seals all properties of an object
 *
 * @param obj - Object to deep seal
 *
 * @returns Deeply sealed object
 */
export default function deepSeal(obj: deepInput): deepInput;
export {};
