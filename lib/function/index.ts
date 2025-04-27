/* Aliases needed - import first */
import {isFunction}         from './is';
import {isAsyncFunction}    from './isAsync';

/* 1:1 Re-exports */
export {debounce}           from './debounce';
export {noop}               from './noop';
export {noopresolve}        from './noopresolve';
export {noopreturn}         from './noopreturn';
export {sleep}              from './sleep';

/* Manual export block for aliasing */
export {
    isFunction,
    isFunction as is,
    isFunction as isFn,
    isAsyncFunction,
    isAsyncFunction as isAsync,
    isAsyncFunction as isAsyncFn
};
