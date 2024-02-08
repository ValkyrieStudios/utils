/**
 * Defines each of the provided properties in props on top of the passed object
 *
 * @param props - Object with properties to define
 * @param obj - (default={}) Object to define on top of
 *
 * @returns Object with the defined properties
 */
export default function define(props: {
    [key: string]: any;
}, obj?: {
    [key: string]: any;
}): {
    [key: string]: any;
};
