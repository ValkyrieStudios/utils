import {isString} from './string';
import {isDate} from './date';
import {isObject} from './object';
import {isArray} from './array';
import {isNumber} from './number';
import {isRegExp} from './regexp';

//
//  GUID : [RFC4122 Compliant]
//

    let performance = false;

    if (typeof(window) !== 'undefined' && (window.performance || {}).now) {                 // eslint-disable-line no-undef
        performance = () => window.performance.now();                                       // eslint-disable-line no-undef
    } else if (typeof(process) !== 'undefined') {                                           // eslint-disable-line no-undef
        performance = () => process.hrtime()[1];                                            // eslint-disable-line no-undef
    } else {
        performance = () => 0;
    }

    export function guid () {
        //  According to : rfc4122
        let d = new Date().getTime();

        //use high-precision timer if available
        d += performance();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;

            d = Math.floor(d / 16);
            return (c === 'x'
                ? r
                : (r & 0x3 | 0x8)).toString(16);
        });
    }

//
//  FNV 1A : https://tools.ietf.org/html/draft-eastlake-fnv-03
//

    //  32 Bit OFFSET_BASIS
    const FNV_OFFSET_BASIS_32 = 2166136261;

    export function fnv1A (data = '', offset = FNV_OFFSET_BASIS_32) {
        let hash = offset;
        let sanitized_data = JSON.stringify(data);

        //  Convert data to a format that is hashable
        if (isString(data)) {
            sanitized_data = data;
        } else if (isArray(data) || isObject(data)) {
            sanitized_data = JSON.stringify(data);
        } else if (isRegExp(data)) {
            sanitized_data = String(data);
        } else if (isDate(data)) {
            sanitized_data = `${data.getTime()}`;
        } else if (isNumber(data)) {
            sanitized_data = `${data}`;
        }

        //  If conversion failed due to an unsupported hash type, make sure to throw an error
        if (sanitized_data === false) {
            throw new TypeError('An FNVA1 Hash could not be calculated for this datatype');
        }

        //  Calculate the hash of the sanitized data by looping over each char
        for (let i = 0; i < sanitized_data.length; i++) {
            hash ^= sanitized_data.charCodeAt(i);

            // 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16777619
            // Using bitshift for accuracy and performance. Numbers in JS suck.
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
        }

        return hash >>> 0;
    }
