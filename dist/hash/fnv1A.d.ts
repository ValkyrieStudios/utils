/**
 * Convert a provided value into a Fowler-Noll-Vo 1A hash
 * For more info: https://tools.ietf.org/html/draft-eastlake-fnv-03
 *
 * @param data - Value to be converted
 * @param offset - (default=2166136261) FNV prime to use
 *
 * @returns FNV1A hash of provided value
 */
export default function fnv1A(data: any, offset?: number): number;
