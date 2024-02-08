interface humanizeBytesOptions {
    delim?: string;
    separator?: string;
    precision?: number;
    units?: string[];
}
export default function humanizeBytes(val: number | string, options?: humanizeBytesOptions): string;
export {};
