'use strict';

//  Check if a variable is a function or not
export default function (val) {
    return !!(val && val.constructor && val.call && val.apply);
}
