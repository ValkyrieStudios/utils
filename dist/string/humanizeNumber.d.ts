interface humanizeNumberOptions {
    delim?: string;
    separator?: string;
    precision?: number;
    units?: string[] | boolean;
    divider?: number;
    real?: boolean;
}
export default function humanizeNumber(val: number | string, options?: humanizeNumberOptions): string;
export {};
