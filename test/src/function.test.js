'use strict';

import isFunction   from '../../src/function/is';
import sleep        from '../../src/function/sleep';
import noop         from '../../src/function/noop';
import noopreturn   from '../../src/function/noopreturn';
import noopresolve  from '../../src/function/noopresolve';
import {
    fnNumericValues,
    fnBooleanValues,
    fnRegexValues,
    fnStringValues,
    fnObjectValues,
    fnDateValues,
    fnArrayValues,
    fnFunctionValues,
    fnNullables,
} from '../constants';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Function - isFunction", () => {
    it ('not see a string as a function', () => {
        let vals = fnStringValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see a numeric value as a function', () => {
        let vals = fnNumericValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see a boolean as a function', () => {
        let vals = fnBooleanValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see a regex as a function', () => {
        let vals = fnRegexValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see an object as a function', () => {
        let vals = fnObjectValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see a nullable as a function', () => {
        let vals = fnNullables();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see a date as a function', () => {
        let vals = fnDateValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('not see an array as a function', () => {
        let vals = fnArrayValues();
        for (let el of vals) expect(isFunction(el)).to.eql(false);
    });

    it ('see a function as a function', () => {
        let vals = fnFunctionValues();
        for (let el of vals) expect(isFunction(el)).to.eql(true);
    });
});

describe("Function - noop", () => {
    let obj, rslt, thrown, var_a;
    let spy_fn = false;

    beforeEach(() => {
        try {
            obj     = { fn : noop };
            rslt    = undefined;
            var_a   = 42;
            thrown  = false;

            spy_fn = spy(obj, 'fn');
            rslt = obj.fn(var_a);
        } catch (err) {
            thrown = true;
        }
    });

    it ('execute the function when called', () => {
        expect(spy_fn).to.have.been.called;
    });

    it ('return nothing', () => {
        expect(rslt).to.eql(undefined);
    });

    it ('not affect parameters', () => {
        expect(var_a).to.eql(42);
    });

    it ('not throw an error', () => {
        expect(thrown).to.eql(false);
    });
});

describe("Function - noopreturn", () => {
    let obj, rslt, thrown, var_a;
    let spy_fn = false;

    beforeEach(() => {
        try {
            obj     = { fn : noopreturn };
            rslt    = undefined;
            var_a   = 42;
            thrown  = false;

            spy_fn = spy(obj, 'fn');
            rslt = obj.fn(var_a);
            rslt = obj.fn(obj.fn(var_a));
        } catch (err) {
            thrown = true;
        }
    });

    it ('execute the function when called', () => {
        expect(spy_fn).to.have.been.called;
    });

    it ('return passed variable', () => {
        expect(rslt).to.eql(42);
    });

    it ('not affect parameters', () => {
        expect(var_a).to.eql(42);
    });

    it ('not throw an error', () => {
        expect(thrown).to.eql(false);
    });
});

describe("Function - noopresolve", () => {
    let obj, rslt, thrown, var_a;
    let spy_fn = false;

    beforeEach(() => {
        try {
            obj     = {fn : noopresolve};
            rslt    = undefined;
            var_a   = 42;
            thrown  = false;

            spy_fn = spy(obj, 'fn');
            rslt = obj.fn(var_a);
        } catch (err) {
            thrown = true;
        }
    });

    it ('execute the function when called', () => {
        expect(spy_fn).to.have.been.called;
    });

    it ('returns a promise', (next) => {
        expect(rslt instanceof Promise).to.eql(true);
        next();
    });

    it ('returns a resolved promise', async () => {
        let is_resolved = false;
        await rslt.then(() => is_resolved = true, () => {}).catch(() => {});
        expect(is_resolved).to.eql(true);
    });

    it ('resolving the promise returns passed variable', (next) => {
        rslt.then((value) => {
            expect(value).to.eql(42);
            next();
        });
    });

    it ('not affect parameters', () => {
        expect(var_a).to.eql(42);
    });

    it ('not throw an error', () => {
        expect(thrown).to.eql(false);
    });
});

describe("Function - sleep", () => {
    it ('execute the function when called', async () => {
        const o = {fn: sleep};
        const fn_spy = spy(o, 'fn');
        await o.fn(0);
        expect(fn_spy).to.have.been.called;
    });

    it ('returns a promise', () => {
        const rslt = sleep();
        expect(rslt instanceof Promise).to.eql(true);
    });

    it ('resolves after the provided time', async () => {
        const timer_start = new Date();
        await sleep(205);
        const timer_end = new Date() - timer_start;
        expect(timer_end >= 200).to.eql(true);
    });
});
