export default function deepSet(obj: {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[], path: string, value: any, define?: boolean): boolean;
