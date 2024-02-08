interface mapOptions {
    merge?: boolean;
}
interface kvMap {
    [key: string]: {
        [key: string]: any;
    };
}
export default function mapFn(arr: {
    [key: string]: any;
}[], fn: (entry: {
    [key: string]: any;
}) => (string | number | boolean), opts?: mapOptions): kvMap;
export {};
