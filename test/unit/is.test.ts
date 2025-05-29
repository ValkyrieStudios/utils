import {describe, it, expect} from 'vitest';
import Is from '../../lib/is';
import equal from '../../lib/equal';
import isArray from '../../lib/array/is';
import isNotEmptyArray from '../../lib/array/isNotEmpty';
import isBoolean from '../../lib/boolean/is';
import isDate from '../../lib/date/is';
import isFormdata from '../../lib/formdata/is';
import isFunction from '../../lib/function/is';
import isAsyncFunction from '../../lib/function/isAsync';
import isNumber from '../../lib/number/is';
import isNumberBetween from '../../lib/number/isBetween';
import isNumberBelow from '../../lib/number/isBelow';
import isNumberBelowOrEqual from '../../lib/number/isBelowOrEqual';
import isNumberAbove from '../../lib/number/isAbove';
import isNumberAboveOrEqual from '../../lib/number/isAboveOrEqual';
import isInteger from '../../lib/number/isInteger';
import isIntegerBetween from '../../lib/number/isIntegerBetween';
import isIntegerBelow from '../../lib/number/isIntegerBelow';
import isIntegerBelowOrEqual from '../../lib/number/isIntegerBelowOrEqual';
import isIntegerAbove from '../../lib/number/isIntegerAbove';
import isIntegerAboveOrEqual from '../../lib/number/isIntegerAboveOrEqual';
import isRegExp from '../../lib/regexp/is';
import isObject from '../../lib/object/is';
import isNotEmptyObject from '../../lib/object/isNotEmpty';
import isString from '../../lib/string/is';
import isStringBetween from '../../lib/string/isBetween';
import isNotEmptyString from '../../lib/string/isNotEmpty';

describe('Is', () => {
    it('Should be an object', () => {
        expect(isObject(Is)).toBe(true);
    });

    it('Should be a frozen object', () => {
        expect(Object.isFrozen(Is)).toBe(true);
    });

    const mappings = [
        ['Array', isArray],
        ['NeArray', isNotEmptyArray],
        ['NotEmptyArray', isNotEmptyArray],
        ['Boolean', isBoolean],
        ['Date', isDate],
        ['Formdata', isFormdata],
        ['Function', isFunction],
        ['AsyncFunction', isAsyncFunction],
        ['Num', isNumber],
        ['NumBetween', isNumberBetween],
        ['NumAbove', isNumberAbove],
        ['NumAboveOrEqual', isNumberAboveOrEqual],
        ['NumBelow', isNumberBelow],
        ['NumBelowOrEqual', isNumberBelowOrEqual],
        ['NumGt', isNumberAbove],
        ['NumGte', isNumberAboveOrEqual],
        ['NumLt', isNumberBelow],
        ['NumLte', isNumberBelowOrEqual],
        ['Number', isNumber],
        ['NumberBetween', isNumberBetween],
        ['NumberAbove', isNumberAbove],
        ['NumberAboveOrEqual', isNumberAboveOrEqual],
        ['NumberBelow', isNumberBelow],
        ['NumberBelowOrEqual', isNumberBelowOrEqual],
        ['Int', isInteger],
        ['IntBetween', isIntegerBetween],
        ['IntAbove', isIntegerAbove],
        ['IntAboveOrEqual', isIntegerAboveOrEqual],
        ['IntBelow', isIntegerBelow],
        ['IntBelowOrEqual', isIntegerBelowOrEqual],
        ['IntGt', isIntegerAbove],
        ['IntGte', isIntegerAboveOrEqual],
        ['IntLt', isIntegerBelow],
        ['IntLte', isIntegerBelowOrEqual],
        ['Integer', isInteger],
        ['IntegerBetween', isIntegerBetween],
        ['IntegerAbove', isIntegerAbove],
        ['IntegerAboveOrEqual', isIntegerAboveOrEqual],
        ['IntegerBelow', isIntegerBelow],
        ['IntegerBelowOrEqual', isIntegerBelowOrEqual],
        ['RegExp', isRegExp],
        ['Object', isObject],
        ['NeObject', isNotEmptyObject],
        ['NotEmptyObject', isNotEmptyObject],
        ['String', isString],
        ['StringBetween', isStringBetween],
        ['NeString', isNotEmptyString],
        ['NotEmptyString', isNotEmptyString],
        ['Equal', equal],
        ['Eq', equal],
    ];

    for (const [name, fn] of mappings) {
        describe(name, () => {
            it(`Should have a ${name} function`, () => {
                expect(typeof Is[name as keyof typeof Is]).toBe('function');
            });

            it('Should link to correct function', () => {
                expect(Is[name as keyof typeof Is]).toBe(fn);
            });
        });
    }
});
