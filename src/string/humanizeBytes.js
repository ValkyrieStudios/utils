'use strict';

import isNumber         from '../number/is';
import isInteger        from '../number/isInteger';
import isString         from '../string/is';
import isNotEmptyString from '../string/isNotEmpty';

const units = [
    {abbreviation: 'bytes'},
    {abbreviation: 'KB'},
    {abbreviation: 'MB'},
    {abbreviation: 'GB'},
    {abbreviation: 'TB'},
    {abbreviation: 'PB'},
    {abbreviation: 'EB'},
    {abbreviation: 'ZB'},
    {abbreviation: 'YB'},
];

//  Humanize a numerical byte value into a readable file size
//
//  @param int  val     Amount of bytes
export default function humanizeBytes (val) {
    if (!(isNumber(val) || isNotEmptyString(val))) return '0 bytes';

    //  Ensure we are working with an integer
    let n = parseInt(isString(val) ? val.trim() : val) || 0;
    if (!isInteger(n) || n === 0) return '0 bytes';

    //  Determine sign
    const sign = n < 0 ? '-' : '';

    //  Ensure val here is absolute
    n = Math.abs(n);

    //  At each step, divide by 2^8, based on that we get the unit size
    let l = 0;
    while (n >= 1024 && ++l && l < units.length) n = n / 1024;

    //  Include a decimal point and a tenths-place digit if presenting less than then of KB or greater units
    return `${sign}${n.toFixed(l > 0 ? 1 : 0)} ${units[l].abbreviation}`;
}
