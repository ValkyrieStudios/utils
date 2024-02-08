type deepInput = {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[];
export default function deepSeal(obj: deepInput): deepInput;
export {};
