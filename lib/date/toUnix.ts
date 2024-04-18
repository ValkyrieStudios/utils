'use strict';

import {isDate} from './is';

/**
 * Returns the unix time in seconds of the passed date
 *
 * @param val - Date to get the unix time for
 *
 * @returns Unix time in seconds
 */
function toUnix (val:Date):number {
    if (
        !isDate(val)
    ) throw new TypeError('toUnix requires a date object');

    return Math.floor(val.valueOf()/1000);
}

export {toUnix, toUnix as default};
