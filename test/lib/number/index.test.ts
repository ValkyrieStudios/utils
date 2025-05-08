import {describe, it}       from 'node:test';
import * as assert          from 'node:assert/strict';
import * as LibNum          from '../../../lib/number';
import is                   from '../../../lib/number/is';
import isAbove              from '../../../lib/number/isAbove';
import isAboveOrEqual       from '../../../lib/number/isAboveOrEqual';
import isBelow              from '../../../lib/number/isBelow';
import isBelowOrEqual       from '../../../lib/number/isBelowOrEqual';
import isBetween            from '../../../lib/number/isBetween';
import isInt                from '../../../lib/number/isInteger';
import isIntAbove           from '../../../lib/number/isIntegerAbove';
import isIntAboveOrEqual    from '../../../lib/number/isIntegerAboveOrEqual';
import isIntBelow           from '../../../lib/number/isIntegerBelow';
import isIntBelowOrEqual    from '../../../lib/number/isIntegerBelowOrEqual';
import isIntBetween         from '../../../lib/number/isIntegerBetween';
import isNumericalNaN       from '../../../lib/number/isNumericalNaN';
import randomBetween        from '../../../lib/number/randomBetween';
import randomIntBetween     from '../../../lib/number/randomIntBetween';
import round                from '../../../lib/number/round';
import toPercentage         from '../../../lib/number/toPercentage';

describe('Number- *', () => {
    it('Should be a correct export', () => {
        assert.deepEqual(LibNum, {
            isGt: isAbove,
            isGte: isAboveOrEqual,
            isLt: isBelow,
            isLte: isBelowOrEqual,
            isBetween: isBetween,
            isInt,
            isIntBetween: isIntBetween,
            isIntGt: isIntAbove,
            isIntGte: isIntAboveOrEqual,
            isIntLt: isIntBelow,
            isIntLte: isIntBelowOrEqual,
            isInteger: isInt,
            isIntegerBetween: isIntBetween,
            isIntegerAbove: isIntAbove,
            isIntegerAboveOrEqual: isIntAboveOrEqual,
            isIntegerBelow: isIntBelow,
            isIntegerBelowOrEqual: isIntBelowOrEqual,
            isNum: is,
            isNumBetween: isBetween,
            isNumGt: isAbove,
            isNumGte: isAboveOrEqual,
            isNumLt: isBelow,
            isNumLte: isBelowOrEqual,
            isNumber: is,
            isNumberBetween: isBetween,
            isNumberAbove: isAbove,
            isNumberAboveOrEqual: isAboveOrEqual,
            isNumberBelow: isBelow,
            isNumberBelowOrEqual: isBelowOrEqual,
            isNumericalNaN,
            randomBetween,
            randBetween: randomBetween,
            randomIntBetween,
            randIntBetween: randomIntBetween,
            round,
            toPercentage,
            toPct: toPercentage,
        });
    });
});
