/* Aliases needed - import first */
import {isDateFormat}   from './isFormat';
import {isDate}         from './is';

/* 1:1 Re-exports */
export {addUTC}         from './addUTC';
export {convertToDate}  from './convertToDate';
export {diff}           from './diff';
export {endOfUTC}       from './endOfUTC';
export {format}         from './format';
export {isLeap}         from './isLeap';
export {nowUnix}        from './nowUnix';
export {nowUnixMs}      from './nowUnixMs';
export {setTimeUTC}     from './setTimeUTC';
export {startOfUTC}     from './startOfUTC';
export {toUnix}         from './toUnix';
export {toUTC}          from './toUTC';

/* Manual export block for aliasing */
export {
    isDateFormat as isFormat,
    isDateFormat,
    isDate,
    isDate as is
};
