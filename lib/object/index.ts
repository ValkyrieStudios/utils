/* Aliases needed - import first */
import {isObject}           from './is';
import {isNotEmptyObject}   from './isNotEmpty';

/* 1:1 Re-exports */
export {define}             from './define';
export {merge}              from './merge';
export {pick}               from './pick';
export {omit}               from './omit';

/* Manual export block for aliasing */
export {
    isObject,
    isObject as is,
    isNotEmptyObject,
    isNotEmptyObject as isNotEmpty,
    isNotEmptyObject as isNeObject,
    isNotEmptyObject as isNe
};
