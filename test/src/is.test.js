'use strict';

import Is                       from '../../src/is';
import equal                    from '../../src/equal';
import isArray                  from '../../src/array/is';
import isNotEmptyArray          from '../../src/array/isNotEmpty';
import isBoolean                from '../../src/boolean/is';
import isDate                   from '../../src/date/is';
import isFunction               from '../../src/function/is';
import isNumber                 from '../../src/number/is';
import isNumberBetween          from '../../src/number/isBetween';
import isNumberBelow            from '../../src/number/isBelow';
import isNumberBelowOrEqual     from '../../src/number/isBelowOrEqual';
import isNumberAbove            from '../../src/number/isAbove';
import isNumberAboveOrEqual     from '../../src/number/isAboveOrEqual';
import isInteger                from '../../src/number/isInteger';
import isIntegerBetween         from '../../src/number/isIntegerBetween';
import isIntegerBelow           from '../../src/number/isIntegerBelow';
import isIntegerBelowOrEqual    from '../../src/number/isIntegerBelowOrEqual';
import isIntegerAbove           from '../../src/number/isIntegerAbove';
import isIntegerAboveOrEqual    from '../../src/number/isIntegerAboveOrEqual';
import isRegExp                 from '../../src/regexp/is';
import isObject                 from '../../src/object/is';
import isNotEmptyObject         from '../../src/object/isNotEmpty';
import isString                 from '../../src/string/is';
import isStringBetween          from '../../src/string/isBetween';
import isNotEmptyString         from '../../src/string/isNotEmpty';


const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Is", () => {

    it ('Should be an object', () => {
        expect(isObject(Is)).to.eql(true);
    });

    it ('Should be a frozen object', () => {
        expect(Object.isFrozen(Is)).to.eql(true);
    });

    it ('Should have its prototype stripped and be a pure object', () => {
        expect(Is.__proto__).to.eql(undefined);
    });

//  Is.Array

    describe("Array", () => {
        it ('Should have a Array function', () => {
            assert.typeOf(Is.Array, 'Function');
        });

        it ('Should link to isArray', () => {
            expect(Is.Array).to.eql(isArray);
        });
    });

//  Is.NeArray

    describe("NeArray", () => {
        it ('Should have a NeArray function', () => {
            assert.typeOf(Is.NeArray, 'Function');
        });

        it ('Should link to isNotEmptyArray', () => {
            expect(Is.NeArray).to.eql(isNotEmptyArray);
        });
    });

//  Is.NotEmptyArray

    describe("NotEmptyArray", () => {
        it ('Should have a NotEmptyArray function', () => {
            assert.typeOf(Is.NotEmptyArray, 'Function');
        });

        it ('Should link to isNotEmptyArray', () => {
            expect(Is.NotEmptyArray).to.eql(isNotEmptyArray);
        });
    });

//  Is.Boolean

    describe("Boolean", () => {
        it ('Should have a Boolean function', () => {
            assert.typeOf(Is.Boolean, 'Function');
        });

        it ('Should link to isBoolean', () => {
            expect(Is.Boolean).to.eql(isBoolean);
        });
    });

//  Is.Date

    describe("Date", () => {
        it ('Should have a Date function', () => {
            assert.typeOf(Is.Date, 'Function');
        });

        it ('Should link to isDate', () => {
            expect(Is.Date).to.eql(isDate);
        });
    });

//  Is.Function

    describe("Function", () => {
        it ('Should have a Function function', () => {
            assert.typeOf(Is.Function, 'Function');
        });

        it ('Should link to isFunction', () => {
            expect(Is.Function).to.eql(isFunction);
        });
    });

//  Is.Num

    describe("Num", () => {
        it ('Should have a Num function', () => {
            assert.typeOf(Is.Num, 'Function');
        });

        it ('Should link to isNumber', () => {
            expect(Is.Num).to.eql(isNumber);
        });
    });

//  Is.NumBetween

    describe("NumBetween", () => {
        it ('Should have a NumBetween function', () => {
            assert.typeOf(Is.NumBetween, 'Function');
        });

        it ('Should link to isNumberBetween', () => {
            expect(Is.NumBetween).to.eql(isNumberBetween);
        });
    });

//  Is.NumAbove

    describe("NumAbove", () => {
        it ('Should have a NumAbove function', () => {
            assert.typeOf(Is.NumAbove, 'Function');
        });

        it ('Should link to isNumberAbove', () => {
            expect(Is.NumAbove).to.eql(isNumberAbove);
        });
    });

//  Is.NumAboveOrEqual

    describe("NumAboveOrEqual", () => {
        it ('Should have a NumAboveOrEqual function', () => {
            assert.typeOf(Is.NumAboveOrEqual, 'Function');
        });

        it ('Should link to isNumberAboveOrEqual', () => {
            expect(Is.NumAboveOrEqual).to.eql(isNumberAboveOrEqual);
        });
    });

//  Is.NumBelow

    describe("NumBelow", () => {
        it ('Should have a NumBelow function', () => {
            assert.typeOf(Is.NumBelow, 'Function');
        });

        it ('Should link to isNumberBelow', () => {
            expect(Is.NumBelow).to.eql(isNumberBelow);
        });
    });

//  Is.NumBelowOrEqual

    describe("NumBelowOrEqual", () => {
        it ('Should have a NumBelowOrEqual function', () => {
            assert.typeOf(Is.NumBelowOrEqual, 'Function');
        });

        it ('Should link to isNumberBelowOrEqual', () => {
            expect(Is.NumBelowOrEqual).to.eql(isNumberBelowOrEqual);
        });
    });

//  Is.NumGt

    describe("NumGt", () => {
        it ('Should have a NumGt function', () => {
            assert.typeOf(Is.NumGt, 'Function');
        });

        it ('Should link to isNumberAbove', () => {
            expect(Is.NumGt).to.eql(isNumberAbove);
        });
    });

//  Is.NumGte

    describe("NumGte", () => {
        it ('Should have a NumGte function', () => {
            assert.typeOf(Is.NumGte, 'Function');
        });

        it ('Should link to isNumberAboveOrEqual', () => {
            expect(Is.NumGte).to.eql(isNumberAboveOrEqual);
        });
    });

//  Is.NumLt

    describe("NumLt", () => {
        it ('Should have a NumLt function', () => {
            assert.typeOf(Is.NumLt, 'Function');
        });

        it ('Should link to isNumberBelow', () => {
            expect(Is.NumLt).to.eql(isNumberBelow);
        });
    });

//  Is.NumLte

    describe("NumLte", () => {
        it ('Should have a NumLte function', () => {
            assert.typeOf(Is.NumLte, 'Function');
        });

        it ('Should link to isNumberBelowOrEqual', () => {
            expect(Is.NumLte).to.eql(isNumberBelowOrEqual);
        });
    });

//  Is.Number

    describe("Number", () => {
        it ('Should have a Number function', () => {
            assert.typeOf(Is.Number, 'Function');
        });

        it ('Should link to isNumber', () => {
            expect(Is.Number).to.eql(isNumber);
        });
    });

//  Is.NumberBetween

    describe("NumberBetween", () => {
        it ('Should have a NumberBetween function', () => {
            assert.typeOf(Is.NumberBetween, 'Function');
        });

        it ('Should link to isNumberBetween', () => {
            expect(Is.NumberBetween).to.eql(isNumberBetween);
        });
    });

//  Is.NumberAbove

    describe("NumberAbove", () => {
        it ('Should have a NumberAbove function', () => {
            assert.typeOf(Is.NumberAbove, 'Function');
        });

        it ('Should link to isNumberAbove', () => {
            expect(Is.NumberAbove).to.eql(isNumberAbove);
        });
    });

//  Is.NumberAboveOrEqual

    describe("NumberAboveOrEqual", () => {
        it ('Should have a NumberAboveOrEqual function', () => {
            assert.typeOf(Is.NumberAboveOrEqual, 'Function');
        });

        it ('Should link to isNumberAboveOrEqual', () => {
            expect(Is.NumberAboveOrEqual).to.eql(isNumberAboveOrEqual);
        });
    });

//  Is.NumberBelow

    describe("NumberBelow", () => {
        it ('Should have a NumberBelow function', () => {
            assert.typeOf(Is.NumberBelow, 'Function');
        });

        it ('Should link to isNumberBelow', () => {
            expect(Is.NumberBelow).to.eql(isNumberBelow);
        });
    });

//  Is.NumberBelowOrEqual

    describe("NumberBelowOrEqual", () => {
        it ('Should have a NumberBelowOrEqual function', () => {
            assert.typeOf(Is.NumberBelowOrEqual, 'Function');
        });

        it ('Should link to isNumberBelowOrEqual', () => {
            expect(Is.NumberBelowOrEqual).to.eql(isNumberBelowOrEqual);
        });
    });

//  Is.Int

    describe("Int", () => {
        it ('Should have a Int function', () => {
            assert.typeOf(Is.Int, 'Function');
        });

        it ('Should link to isInteger', () => {
            expect(Is.Int).to.eql(isInteger);
        });
    });

//  Is.IntBetween

    describe("IntBetween", () => {
        it ('Should have a IntBetween function', () => {
            assert.typeOf(Is.IntBetween, 'Function');
        });

        it ('Should link to isIntegerBetween', () => {
            expect(Is.IntBetween).to.eql(isIntegerBetween);
        });
    });

//  Is.IntAbove

    describe("IntAbove", () => {
        it ('Should have a IntAbove function', () => {
            assert.typeOf(Is.IntAbove, 'Function');
        });

        it ('Should link to isIntegerAbove', () => {
            expect(Is.IntAbove).to.eql(isIntegerAbove);
        });
    });

//  Is.IntAboveOrEqual

    describe("IntAboveOrEqual", () => {
        it ('Should have a IntAboveOrEqual function', () => {
            assert.typeOf(Is.IntAboveOrEqual, 'Function');
        });

        it ('Should link to isIntegerAboveOrEqual', () => {
            expect(Is.IntAboveOrEqual).to.eql(isIntegerAboveOrEqual);
        });
    });

//  Is.IntBelow

    describe("IntBelow", () => {
        it ('Should have a IntBelow function', () => {
            assert.typeOf(Is.IntBelow, 'Function');
        });

        it ('Should link to isIntegerBelow', () => {
            expect(Is.IntBelow).to.eql(isIntegerBelow);
        });
    });

//  Is.IntBelowOrEqual

    describe("IntBelowOrEqual", () => {
        it ('Should have a IntBelowOrEqual function', () => {
            assert.typeOf(Is.IntBelowOrEqual, 'Function');
        });

        it ('Should link to isIntegerBelowOrEqual', () => {
            expect(Is.IntBelowOrEqual).to.eql(isIntegerBelowOrEqual);
        });
    });

//  Is.IntGt

    describe("IntGt", () => {
        it ('Should have a IntGt function', () => {
            assert.typeOf(Is.IntGt, 'Function');
        });

        it ('Should link to isIntegerAbove', () => {
            expect(Is.IntGt).to.eql(isIntegerAbove);
        });
    });

//  Is.IntGte

    describe("IntGte", () => {
        it ('Should have a IntGte function', () => {
            assert.typeOf(Is.IntGte, 'Function');
        });

        it ('Should link to isIntegerAboveOrEqual', () => {
            expect(Is.IntGte).to.eql(isIntegerAboveOrEqual);
        });
    });

//  Is.IntLt

    describe("IntLt", () => {
        it ('Should have a IntLt function', () => {
            assert.typeOf(Is.IntLt, 'Function');
        });

        it ('Should link to isIntegerBelow', () => {
            expect(Is.IntLt).to.eql(isIntegerBelow);
        });
    });

//  Is.IntLte

    describe("IntLte", () => {
        it ('Should have a IntLte function', () => {
            assert.typeOf(Is.IntLte, 'Function');
        });

        it ('Should link to isIntegerBelowOrEqual', () => {
            expect(Is.IntLte).to.eql(isIntegerBelowOrEqual);
        });
    });

//  Is.Integer

    describe("Integer", () => {
        it ('Should have a Integer function', () => {
            assert.typeOf(Is.Integer, 'Function');
        });

        it ('Should link to isInteger', () => {
            expect(Is.Integer).to.eql(isInteger);
        });
    });

//  Is.IntegerBetween

    describe("IntegerBetween", () => {
        it ('Should have a IntegerBetween function', () => {
            assert.typeOf(Is.IntegerBetween, 'Function');
        });

        it ('Should link to isIntegerBetween', () => {
            expect(Is.IntegerBetween).to.eql(isIntegerBetween);
        });
    });

//  Is.IntegerAbove

    describe("IntegerAbove", () => {
        it ('Should have a IntegerAbove function', () => {
            assert.typeOf(Is.IntegerAbove, 'Function');
        });

        it ('Should link to isIntegerAbove', () => {
            expect(Is.IntegerAbove).to.eql(isIntegerAbove);
        });
    });

//  Is.IntegerAboveOrEqual

    describe("IntegerAboveOrEqual", () => {
        it ('Should have a IntegerAboveOrEqual function', () => {
            assert.typeOf(Is.IntegerAboveOrEqual, 'Function');
        });

        it ('Should link to isIntegerAboveOrEqual', () => {
            expect(Is.IntegerAboveOrEqual).to.eql(isIntegerAboveOrEqual);
        });
    });

//  Is.IntegerBelow

    describe("IntegerBelow", () => {
        it ('Should have a IntegerBelow function', () => {
            assert.typeOf(Is.IntegerBelow, 'Function');
        });

        it ('Should link to isIntegerBelow', () => {
            expect(Is.IntegerBelow).to.eql(isIntegerBelow);
        });
    });

//  Is.IntegerBelowOrEqual

    describe("IntegerBelowOrEqual", () => {
        it ('Should have a IntegerBelowOrEqual function', () => {
            assert.typeOf(Is.IntegerBelowOrEqual, 'Function');
        });

        it ('Should link to isIntegerBelowOrEqual', () => {
            expect(Is.IntegerBelowOrEqual).to.eql(isIntegerBelowOrEqual);
        });
    });

//  Is.RegExp

    describe("RegExp", () => {
        it ('Should have a RegExp function', () => {
            assert.typeOf(Is.RegExp, 'Function');
        });

        it ('Should link to isRegExp', () => {
            expect(Is.RegExp).to.eql(isRegExp);
        });
    });

//  Is.Object

    describe("Object", () => {
        it ('Should have a Object function', () => {
            assert.typeOf(Is.Object, 'Function');
        });

        it ('Should link to isObject', () => {
            expect(Is.Object).to.eql(isObject);
        });
    });

//  Is.NeObject

    describe("NeObject", () => {
        it ('Should have a NeObject function', () => {
            assert.typeOf(Is.NeObject, 'Function');
        });

        it ('Should link to isNotEmptyObject', () => {
            expect(Is.NeObject).to.eql(isNotEmptyObject);
        });
    });

//  Is.NotEmptyObject

    describe("NotEmptyObject", () => {
        it ('Should have a NotEmptyObject function', () => {
            assert.typeOf(Is.NotEmptyObject, 'Function');
        });

        it ('Should link to isNotEmptyObject', () => {
            expect(Is.NotEmptyObject).to.eql(isNotEmptyObject);
        });
    });

//  Is.String

    describe("String", () => {
        it ('Should have a String function', () => {
            assert.typeOf(Is.String, 'Function');
        });

        it ('Should link to isString', () => {
            expect(Is.String).to.eql(isString);
        });
    });

//  Is.StringBetween

    describe("StringBetween", () => {
        it ('Should have a StringBetween function', () => {
            assert.typeOf(Is.StringBetween, 'Function');
        });

        it ('Should link to isStringBetween', () => {
            expect(Is.StringBetween).to.eql(isStringBetween);
        });
    });

//  Is.NeString

    describe("NeString", () => {
        it ('Should have a NeString function', () => {
            assert.typeOf(Is.NeString, 'Function');
        });

        it ('Should link to isNotEmptyString', () => {
            expect(Is.NeString).to.eql(isNotEmptyString);
        });
    });

//  Is.NotEmptyString

    describe("NotEmptyString", () => {
        it ('Should have a NotEmptyString function', () => {
            assert.typeOf(Is.NotEmptyString, 'Function');
        });

        it ('Should link to isNotEmptyString', () => {
            expect(Is.NotEmptyString).to.eql(isNotEmptyString);
        });
    });

//  Is.Equal

    describe("Equal", () => {
        it ('Should have a Equal function', () => {
            assert.typeOf(Is.Equal, 'Function');
        });

        it ('Should link to equal', () => {
            expect(Is.Equal).to.eql(equal);
        });
    });

//  Is.Eq

    describe("Eq", () => {
        it ('Should have a Eq function', () => {
            assert.typeOf(Is.Eq, 'Function');
        });

        it ('Should link to equal', () => {
            expect(Is.Eq).to.eql(equal);
        });
    });

});
