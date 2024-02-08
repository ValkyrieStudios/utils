interface mapOptions {
    merge?: boolean;
}
interface kvMap {
    [key: string]: {
        [key: string]: any;
    };
}
export default function mapKey(arr: {
    [key: string]: any;
}[], key: string, opts?: mapOptions): kvMap;
export {};
