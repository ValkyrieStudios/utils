/* Aliases needed - import first */
import {isString}           from './is';
import {isNotEmptyString}   from './isNotEmpty';
import {isStringBetween}    from './isBetween';

/* 1:1 Re-exports */
export {humanizeBytes}      from './humanizeBytes';
export {humanizeNumber}     from './humanizeNumber';
export {shorten}            from './shorten';

/* Manual export block for aliasing */
export {
    isString,
    isString as is,
    isNotEmptyString,
    isNotEmptyString as isNotEmpty,
    isNotEmptyString as isNeString,
    isNotEmptyString as isNe,
    isStringBetween,
    isStringBetween as isBetween
};
