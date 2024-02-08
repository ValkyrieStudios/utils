interface mapOptions {
    valtrim?: boolean;
    valround?: boolean | number;
    keyround?: boolean;
}
interface mapReturn {
    [key: string]: string | number;
}
export default function mapPrimitive(arr: any[], opts?: mapOptions): mapReturn;
export {};
