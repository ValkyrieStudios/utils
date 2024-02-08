/**
 * Sets a property and its value deep in the structure of an object
 *
 * Example:
 *  const myObj = {a: 2};
 *  deepSet(myObj, 'b.c.d.e', 4);
 * Output:
 *  {
 *      a: 2,
 *      b: {
 *          c: {
 *              d: {
 *                  e: 4
 *              }
 *          }
 *      }
 *  }
 *
 * Example:
 *  const myObj = {a: 2, b: [{price: 2}]};
 *  deepSet(myObj, 'b[0].price', 4);
 * Output:
 *  {
 *      a: 2,
 *      b: [
 *          {price: 4}
 *      ]
 *  }
 *
 * @param val - Object to set the value on
 * @param path - Path string to deeply set the value at
 * @param value - Value to set (if using defineProperty can be an accessor object)
 * @param define - Whether or not the property should be directly assigned or set using Object.defineProperty
 *
 * @returns True or false depending on whether or not the property was set correctly
 * @throws {TypeError}
 */
export default function deepSet(obj: {
    [key: string]: any;
} | {
    [key: string]: any;
}[] | any[], path: string, value: any, define?: boolean): boolean;
