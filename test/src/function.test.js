import { isFunction, noop, noopreturn, noopresolve } from '../../src/function';

describe("Function - isFunction", () => {
    it ('not see a string as a function', () => {
        expect(isFunction('foo')).toEqual(false);
        expect(isFunction(new String('bar'))).toEqual(false);
    });

    it ('not see a numeric value as a function', () => {
        expect(isFunction(1)).toEqual(false);
        expect(isFunction(NaN)).toEqual(false);
        expect(isFunction(0.000001)).toEqual(false);
        expect(isFunction(8e10)).toEqual(false);
        expect(isFunction(Math.PI)).toEqual(false);
        expect(isFunction(new Number(1.12345))).toEqual(false);
        expect(isFunction(new Number(Number.EPSILON))).toEqual(false);
    });

    it ('not see a boolean as a function', () => {
        expect(isFunction(true)).toEqual(false);
        expect(isFunction(false)).toEqual(false);
        expect(isFunction(Boolean(true))).toEqual(false);
        expect(isFunction(Boolean(false))).toEqual(false);
        expect(isFunction(Boolean('foo'))).toEqual(false);
        expect(isFunction(new Boolean(false))).toEqual(false);
    });

    it ('not see a regex as a function', () => {
        expect(isFunction(/abcdefg/i)).toEqual(false);
        expect(isFunction(new RegExp('\\w+'))).toEqual(false);
    });

    it ('not see an object as a function', () => {
        expect(isFunction({bar:'foo'})).toEqual(false);
        expect(isFunction(new Object())).toEqual(false);
        expect(isFunction(Object.create(null))).toEqual(false);
        expect(isFunction(Object.create([]))).toEqual(false);
    });

    it ('not see a null as a function', () => {
        expect(isFunction(null)).toEqual(false);
    });

    it ('not see a date as a function', () => {
        expect(isFunction(new Date())).toEqual(false);
        expect(isFunction(Date.now())).toEqual(false);
    });

    it ('not see an undefined as a function', () => {
        expect(isFunction(undefined)).toEqual(false);
    });

    it ('not see an array as a function', () => {
        expect(isFunction([0, 1, 2])).toEqual(false);
        expect(isFunction(new Array(1, 2, 3))).toEqual(false);
        expect(isFunction(new Array(5))).toEqual(false);
    });

    it ('see a function as a function', () => {
        function testFunction () {}

        const testArrowFunction = () => {};

        expect(isFunction(testFunction)).toEqual(true);
        expect(isFunction(testArrowFunction)).toEqual(true);
    });

    it ('not see formdata as a function', () => {
        let fdata = new FormData();
        expect(isFunction(fdata)).toEqual(false);
    });
});

describe("Function - noop", () => {
    let obj, rslt, thrown, var_a;

    beforeEach(() => {
        try {
            obj     = { fn : noop };
            rslt    = undefined;
            var_a   = 42;
            thrown  = false;

            spyOn(obj, 'fn');

            rslt = obj.fn(var_a);
        } catch (err) {
            thrown = true;
        }
    });

    it ('execute the function when called', () => {
        expect(obj.fn).toHaveBeenCalled();
    });

    it ('return nothing', () => {
        expect(rslt).toBeUndefined();
    });

    it ('not affect parameters', () => {
        expect(var_a).toBe(42);
    });

    it ('not throw an error', () => {
        expect(thrown).toBe(false);
    });
});

describe("Function - noopreturn", () => {
    let obj, rslt, thrown, var_a;

    beforeEach(() => {
        try {
            obj     = { fn : noopreturn };
            rslt    = undefined;
            var_a   = 42;
            thrown  = false;

            spyOn(obj, 'fn').and.callThrough();
            rslt = obj.fn(var_a);
            rslt = obj.fn(obj.fn(var_a));
        } catch (err) {
            thrown = true;
        }
    });

    it ('execute the function when called', () => {
        expect(obj.fn).toHaveBeenCalled();
    });

    it ('return passed variable', () => {
        expect(rslt).toBe(42);
    });

    it ('not affect parameters', () => {
        expect(var_a).toBe(42);
    });

    it ('not throw an error', () => {
        expect(thrown).toBe(false);
    });
});

describe("Function - noopresolve", () => {
    let obj, rslt, thrown, var_a;

    beforeEach(() => {
        try {
            obj     = { fn : noopresolve };
            rslt    = undefined;
            var_a   = 42;
            thrown  = false;

            spyOn(obj, 'fn').and.callThrough();
            rslt = obj.fn(var_a);
        } catch (err) {
            thrown = true;
        }
    });

    it ('execute the function when called', () => {
        expect(obj.fn).toHaveBeenCalled();
    });

    it ('returns a promise', (next) => {
        expect(rslt instanceof Promise).toBe(true);
        next();
    });

    it ('returns a resolved promise', (next) => {
        rslt.then(
            next,
            () => next(new Error('Promise should have resolved, instead it rejected'))
        ).catch(
            () => next(new Error('Promise should have resolved, instead it threw an error'))
        );
    });

    it ('resolving the promise returns passed variable', (next) => {
        rslt.then((value) => {
            expect(value).toBe(42);
            next();
        });
    });

    it ('not affect parameters', () => {
        expect(var_a).toBe(42);
    });

    it ('not throw an error', () => {
        expect(thrown).toBe(false);
    });
});
