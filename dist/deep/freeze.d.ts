type deepInput = {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[];
export default function deepFreeze(obj: deepInput): Readonly<deepInput>;
export {};
