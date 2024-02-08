/**
 * Shorten a string and add a postfix if it goes over a specific length, will autotrim value.
 *
 * @param val - String value to shorten
 * @param length - Length to shorten it to
 * @param postfix - (default='...') Postfix to use in case the string got shortened
 *
 * @returns Shortened string
 */
export default function shorten(val: string, length: number, postfix?: string): string;
