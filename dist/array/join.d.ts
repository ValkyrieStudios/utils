interface joinOptions {
    delim?: string;
    trim?: boolean;
    valtrim?: boolean;
    valround?: number;
}
export default function join(val: any[], opts?: joinOptions): string;
export {};
