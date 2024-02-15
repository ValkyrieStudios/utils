'use strict';

/* eslint-disable max-statements */

import {describe, it}           from 'node:test';
import * as assert              from 'node:assert/strict';
import Is                       from '../../lib/is';
import equal                    from '../../lib/equal';
import isArray                  from '../../lib/array/is';
import isNotEmptyArray          from '../../lib/array/isNotEmpty';
import isBoolean                from '../../lib/boolean/is';
import isDate                   from '../../lib/date/is';
import isFunction               from '../../lib/function/is';
import isAsyncFunction          from '../../lib/function/isAsync';
import isNumber                 from '../../lib/number/is';
import isNumberBetween          from '../../lib/number/isBetween';
import isNumberBelow            from '../../lib/number/isBelow';
import isNumberBelowOrEqual     from '../../lib/number/isBelowOrEqual';
import isNumberAbove            from '../../lib/number/isAbove';
import isNumberAboveOrEqual     from '../../lib/number/isAboveOrEqual';
import isInteger                from '../../lib/number/isInteger';
import isIntegerBetween         from '../../lib/number/isIntegerBetween';
import isIntegerBelow           from '../../lib/number/isIntegerBelow';
import isIntegerBelowOrEqual    from '../../lib/number/isIntegerBelowOrEqual';
import isIntegerAbove           from '../../lib/number/isIntegerAbove';
import isIntegerAboveOrEqual    from '../../lib/number/isIntegerAboveOrEqual';
import isRegExp                 from '../../lib/regexp/is';
import isObject                 from '../../lib/object/is';
import isNotEmptyObject         from '../../lib/object/isNotEmpty';
import isString                 from '../../lib/string/is';
import isStringBetween          from '../../lib/string/isBetween';
import isNotEmptyString         from '../../lib/string/isNotEmpty';

describe('Is', () => {
    it('Should be an object', () => {
        assert.equal(isObject(Is), true);
    });

    it('Should be a frozen object', () => {
        assert.equal(Object.isFrozen(Is), true);
    });

    describe('Array', () => {
        it('Should have a Array function', () => {
            assert.equal(typeof Is.Array, 'function');
        });

        it('Should link to isArray', () => {
            assert.equal(Is.Array, isArray);
        });
    });

    describe('NeArray', () => {
        it('Should have a NeArray function', () => {
            assert.equal(typeof Is.NeArray, 'function');
        });

        it('Should link to isNotEmptyArray', () => {
            assert.equal(Is.NeArray, isNotEmptyArray);
        });
    });

    describe('NotEmptyArray', () => {
        it('Should have a NotEmptyArray function', () => {
            assert.equal(typeof Is.NotEmptyArray, 'function');
        });

        it('Should link to isNotEmptyArray', () => {
            assert.equal(Is.NotEmptyArray, isNotEmptyArray);
        });
    });

    describe('Boolean', () => {
        it('Should have a Boolean function', () => {
            assert.equal(typeof Is.Boolean, 'function');
        });

        it('Should link to isBoolean', () => {
            assert.equal(Is.Boolean, isBoolean);
        });
    });

    describe('Date', () => {
        it('Should have a Date function', () => {
            assert.equal(typeof Is.Date, 'function');
        });

        it('Should link to isDate', () => {
            assert.equal(Is.Date, isDate);
        });
    });

    describe('Function', () => {
        it('Should have a Function function', () => {
            assert.equal(typeof Is.Function, 'function');
        });

        it('Should link to isFunction', () => {
            assert.equal(Is.Function, isFunction);
        });
    });

    describe('AsyncFunction', () => {
        it('Should have a AsyncFunction function', () => {
            assert.equal(typeof Is.AsyncFunction, 'function');
        });

        it('Should link to isAsyncFunction', () => {
            assert.equal(Is.AsyncFunction, isAsyncFunction);
        });
    });

    describe('Num', () => {
        it('Should have a Num function', () => {
            assert.equal(typeof Is.Num, 'function');
        });

        it('Should link to isNumber', () => {
            assert.equal(Is.Num, isNumber);
        });
    });

    describe('NumBetween', () => {
        it('Should have a NumBetween function', () => {
            assert.equal(typeof Is.NumBetween, 'function');
        });

        it('Should link to isNumberBetween', () => {
            assert.equal(Is.NumBetween, isNumberBetween);
        });
    });

    describe('NumAbove', () => {
        it('Should have a NumAbove function', () => {
            assert.equal(typeof Is.NumAbove, 'function');
        });

        it('Should link to isNumberAbove', () => {
            assert.equal(Is.NumAbove, isNumberAbove);
        });
    });

    describe('NumAboveOrEqual', () => {
        it('Should have a NumAboveOrEqual function', () => {
            assert.equal(typeof Is.NumAboveOrEqual, 'function');
        });

        it('Should link to isNumberAboveOrEqual', () => {
            assert.equal(Is.NumAboveOrEqual, isNumberAboveOrEqual);
        });
    });

    describe('NumBelow', () => {
        it('Should have a NumBelow function', () => {
            assert.equal(typeof Is.NumBelow, 'function');
        });

        it('Should link to isNumberBelow', () => {
            assert.equal(Is.NumBelow, isNumberBelow);
        });
    });

    describe('NumBelowOrEqual', () => {
        it('Should have a NumBelowOrEqual function', () => {
            assert.equal(typeof Is.NumBelowOrEqual, 'function');
        });

        it('Should link to isNumberBelowOrEqual', () => {
            assert.equal(Is.NumBelowOrEqual, isNumberBelowOrEqual);
        });
    });

    describe('NumGt', () => {
        it('Should have a NumGt function', () => {
            assert.equal(typeof Is.NumGt, 'function');
        });

        it('Should link to isNumberAbove', () => {
            assert.equal(Is.NumGt, isNumberAbove);
        });
    });

    describe('NumGte', () => {
        it('Should have a NumGte function', () => {
            assert.equal(typeof Is.NumGte, 'function');
        });

        it('Should link to isNumberAboveOrEqual', () => {
            assert.equal(Is.NumGte, isNumberAboveOrEqual);
        });
    });

    describe('NumLt', () => {
        it('Should have a NumLt function', () => {
            assert.equal(typeof Is.NumLt, 'function');
        });

        it('Should link to isNumberBelow', () => {
            assert.equal(Is.NumLt, isNumberBelow);
        });
    });

    describe('NumLte', () => {
        it('Should have a NumLte function', () => {
            assert.equal(typeof Is.NumLte, 'function');
        });

        it('Should link to isNumberBelowOrEqual', () => {
            assert.equal(Is.NumLte, isNumberBelowOrEqual);
        });
    });

    describe('Number', () => {
        it('Should have a Number function', () => {
            assert.equal(typeof Is.Number, 'function');
        });

        it('Should link to isNumber', () => {
            assert.equal(Is.Number, isNumber);
        });
    });

    describe('NumberBetween', () => {
        it('Should have a NumberBetween function', () => {
            assert.equal(typeof Is.NumberBetween, 'function');
        });

        it('Should link to isNumberBetween', () => {
            assert.equal(Is.NumberBetween, isNumberBetween);
        });
    });

    describe('NumberAbove', () => {
        it('Should have a NumberAbove function', () => {
            assert.equal(typeof Is.NumberAbove, 'function');
        });

        it('Should link to isNumberAbove', () => {
            assert.equal(Is.NumberAbove, isNumberAbove);
        });
    });

    describe('NumberAboveOrEqual', () => {
        it('Should have a NumberAboveOrEqual function', () => {
            assert.equal(typeof Is.NumberAboveOrEqual, 'function');
        });

        it('Should link to isNumberAboveOrEqual', () => {
            assert.equal(Is.NumberAboveOrEqual, isNumberAboveOrEqual);
        });
    });

    describe('NumberBelow', () => {
        it('Should have a NumberBelow function', () => {
            assert.equal(typeof Is.NumberBelow, 'function');
        });

        it('Should link to isNumberBelow', () => {
            assert.equal(Is.NumberBelow, isNumberBelow);
        });
    });

    describe('NumberBelowOrEqual', () => {
        it('Should have a NumberBelowOrEqual function', () => {
            assert.equal(typeof Is.NumberBelowOrEqual, 'function');
        });

        it('Should link to isNumberBelowOrEqual', () => {
            assert.equal(Is.NumberBelowOrEqual, isNumberBelowOrEqual);
        });
    });

    describe('Int', () => {
        it('Should have a Int function', () => {
            assert.equal(typeof Is.Int, 'function');
        });

        it('Should link to isInteger', () => {
            assert.equal(Is.Int, isInteger);
        });
    });

    describe('IntBetween', () => {
        it('Should have a IntBetween function', () => {
            assert.equal(typeof Is.IntBetween, 'function');
        });

        it('Should link to isIntegerBetween', () => {
            assert.equal(Is.IntBetween, isIntegerBetween);
        });
    });

    describe('IntAbove', () => {
        it('Should have a IntAbove function', () => {
            assert.equal(typeof Is.IntAbove, 'function');
        });

        it('Should link to isIntegerAbove', () => {
            assert.equal(Is.IntAbove, isIntegerAbove);
        });
    });

    describe('IntAboveOrEqual', () => {
        it('Should have a IntAboveOrEqual function', () => {
            assert.equal(typeof Is.IntAboveOrEqual, 'function');
        });

        it('Should link to isIntegerAboveOrEqual', () => {
            assert.equal(Is.IntAboveOrEqual, isIntegerAboveOrEqual);
        });
    });

    describe('IntBelow', () => {
        it('Should have a IntBelow function', () => {
            assert.equal(typeof Is.IntBelow, 'function');
        });

        it('Should link to isIntegerBelow', () => {
            assert.equal(Is.IntBelow, isIntegerBelow);
        });
    });

    describe('IntBelowOrEqual', () => {
        it('Should have a IntBelowOrEqual function', () => {
            assert.equal(typeof Is.IntBelowOrEqual, 'function');
        });

        it('Should link to isIntegerBelowOrEqual', () => {
            assert.equal(Is.IntBelowOrEqual, isIntegerBelowOrEqual);
        });
    });

    describe('IntGt', () => {
        it('Should have a IntGt function', () => {
            assert.equal(typeof Is.IntGt, 'function');
        });

        it('Should link to isIntegerAbove', () => {
            assert.equal(Is.IntGt, isIntegerAbove);
        });
    });

    describe('IntGte', () => {
        it('Should have a IntGte function', () => {
            assert.equal(typeof Is.IntGte, 'function');
        });

        it('Should link to isIntegerAboveOrEqual', () => {
            assert.equal(Is.IntGte, isIntegerAboveOrEqual);
        });
    });

    describe('IntLt', () => {
        it('Should have a IntLt function', () => {
            assert.equal(typeof Is.IntLt, 'function');
        });

        it('Should link to isIntegerBelow', () => {
            assert.equal(Is.IntLt, isIntegerBelow);
        });
    });

    describe('IntLte', () => {
        it('Should have a IntLte function', () => {
            assert.equal(typeof Is.IntLte, 'function');
        });

        it('Should link to isIntegerBelowOrEqual', () => {
            assert.equal(Is.IntLte, isIntegerBelowOrEqual);
        });
    });

    describe('Integer', () => {
        it('Should have a Integer function', () => {
            assert.equal(typeof Is.Integer, 'function');
        });

        it('Should link to isInteger', () => {
            assert.equal(Is.Integer, isInteger);
        });
    });

    describe('IntegerBetween', () => {
        it('Should have a IntegerBetween function', () => {
            assert.equal(typeof Is.IntegerBetween, 'function');
        });

        it('Should link to isIntegerBetween', () => {
            assert.equal(Is.IntegerBetween, isIntegerBetween);
        });
    });

    describe('IntegerAbove', () => {
        it('Should have a IntegerAbove function', () => {
            assert.equal(typeof Is.IntegerAbove, 'function');
        });

        it('Should link to isIntegerAbove', () => {
            assert.equal(Is.IntegerAbove, isIntegerAbove);
        });
    });

    describe('IntegerAboveOrEqual', () => {
        it('Should have a IntegerAboveOrEqual function', () => {
            assert.equal(typeof Is.IntegerAboveOrEqual, 'function');
        });

        it('Should link to isIntegerAboveOrEqual', () => {
            assert.equal(Is.IntegerAboveOrEqual, isIntegerAboveOrEqual);
        });
    });

    describe('IntegerBelow', () => {
        it('Should have a IntegerBelow function', () => {
            assert.equal(typeof Is.IntegerBelow, 'function');
        });

        it('Should link to isIntegerBelow', () => {
            assert.equal(Is.IntegerBelow, isIntegerBelow);
        });
    });

    describe('IntegerBelowOrEqual', () => {
        it('Should have a IntegerBelowOrEqual function', () => {
            assert.equal(typeof Is.IntegerBelowOrEqual, 'function');
        });

        it('Should link to isIntegerBelowOrEqual', () => {
            assert.equal(Is.IntegerBelowOrEqual, isIntegerBelowOrEqual);
        });
    });

    describe('RegExp', () => {
        it('Should have a RegExp function', () => {
            assert.equal(typeof Is.RegExp, 'function');
        });

        it('Should link to isRegExp', () => {
            assert.equal(Is.RegExp, isRegExp);
        });
    });

    describe('Object', () => {
        it('Should have a Object function', () => {
            assert.equal(typeof Is.Object, 'function');
        });

        it('Should link to isObject', () => {
            assert.equal(Is.Object, isObject);
        });
    });

    describe('NeObject', () => {
        it('Should have a NeObject function', () => {
            assert.equal(typeof Is.NeObject, 'function');
        });

        it('Should link to isNotEmptyObject', () => {
            assert.equal(Is.NeObject, isNotEmptyObject);
        });
    });

    describe('NotEmptyObject', () => {
        it('Should have a NotEmptyObject function', () => {
            assert.equal(typeof Is.NotEmptyObject, 'function');
        });

        it('Should link to isNotEmptyObject', () => {
            assert.equal(Is.NotEmptyObject, isNotEmptyObject);
        });
    });

    describe('String', () => {
        it('Should have a String function', () => {
            assert.equal(typeof Is.String, 'function');
        });

        it('Should link to isString', () => {
            assert.equal(Is.String, isString);
        });
    });

    describe('StringBetween', () => {
        it('Should have a StringBetween function', () => {
            assert.equal(typeof Is.StringBetween, 'function');
        });

        it('Should link to isStringBetween', () => {
            assert.equal(Is.StringBetween, isStringBetween);
        });
    });

    describe('NeString', () => {
        it('Should have a NeString function', () => {
            assert.equal(typeof Is.NeString, 'function');
        });

        it('Should link to isNotEmptyString', () => {
            assert.equal(Is.NeString, isNotEmptyString);
        });
    });

    describe('NotEmptyString', () => {
        it('Should have a NotEmptyString function', () => {
            assert.equal(typeof Is.NotEmptyString, 'function');
        });

        it('Should link to isNotEmptyString', () => {
            assert.equal(Is.NotEmptyString, isNotEmptyString);
        });
    });

    describe('Equal', () => {
        it('Should have a Equal function', () => {
            assert.equal(typeof Is.Equal, 'function');
        });

        it('Should link to equal', () => {
            assert.equal(Is.Equal, equal);
        });
    });

    describe('Eq', () => {
        it('Should have a Eq function', () => {
            assert.equal(typeof Is.Eq, 'function');
        });

        it('Should link to equal', () => {
            assert.equal(Is.Eq, equal);
        });
    });
});
