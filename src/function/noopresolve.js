'use strict';

//  Nothing to execute here ... simply resolve
export default function noopresolve (value) {
    return new Promise(resolve => resolve(value));
}
