'use strict';

export default function noopresolve (value) {
    return new Promise(resolve => resolve(value));
}
