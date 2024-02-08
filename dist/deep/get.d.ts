export default function deepGet(obj: {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[], path: string, get_parent?: boolean): any | undefined;
