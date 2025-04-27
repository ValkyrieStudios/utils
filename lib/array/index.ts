/* Aliases needed - import first */
import {isArray}            from './is';
import {isNotEmptyArray}    from './isNotEmpty';

/* 1:1 Re-exports */
export {dedupe}             from './dedupe';
export {join}               from './join';
export {mapFn}              from './mapFn';
export {mapFnAsMap}         from './mapFnAsMap';
export {mapKey}             from './mapKey';
export {mapKeyAsMap}        from './mapKeyAsMap';
export {mapPrimitive}       from './mapPrimitive';
export {groupBy}            from './groupBy';
export {shuffle}            from './shuffle';
export {split}              from './split';
export {sort}               from './sort';

/* Manual export block for aliasing */
export {
    isArray,
    isArray as is,
    isNotEmptyArray,
    isNotEmptyArray as isNotEmpty,
    isNotEmptyArray as isNeArray,
    isNotEmptyArray as isNe
};
