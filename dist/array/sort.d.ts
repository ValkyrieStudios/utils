interface sortOptions {
    filter_fn?: (el: any) => boolean;
    nokey_hide?: boolean;
    nokey_atend?: boolean;
}
interface sortObject {
    [key: string]: any;
}
type sortByFunction = (el: sortObject) => string;
export default function sort(arr: sortObject[], by: string | sortByFunction, dir?: 'asc' | 'desc', opts?: sortOptions): sortObject[];
export {};
