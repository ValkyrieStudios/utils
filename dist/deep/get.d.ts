/**
 * Get a property's value deep inside the structure of an array/object
 *
 * Example:
 *  const myObj = {
 *      a: 2,
 *      b: [
 *          {price : 2},
 *          {price : 4},
 *      ],
 *  };
 *  deepGet(myObj, 'b[0].price');
 * Output:
 *  2
 *
 * @param val - Object/Array to get the value from
 * @param path - Path string to deeply get the value at
 * @param get_parent - If passed as true retrieves the parent of where the value lives
 *
 * @returns Value stored at property or undefined
 * @throws {TypeError}
 */
export default function deepGet(obj: {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[], path: string, get_parent?: boolean): any | undefined;
