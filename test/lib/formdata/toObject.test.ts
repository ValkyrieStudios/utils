/* eslint-disable max-statements */

import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import {toObject} from '../../../lib/formdata/toObject';
import CONSTANTS        from '../../constants';

describe('FormData - toObject', () => {
    it('Should be a function', () => {
        assert.ok(typeof toObject === 'function');
    });

    it('Should not be an async function', () => {
        assert.ok(toObject.constructor.name !== 'AsyncFunction');
    });

    it('Should throw when passed anything but a FormData instance', () => {
        for (const el of CONSTANTS.NOT_FORM_DATA) {
            assert.throws(
                () => toObject(el),
                new Error('formdata/toObject: Value is not an instance of FormData')
            );
        }
    });

    it('Should correctly convert an empty FormData instance', () => {
        assert.deepEqual(toObject(new FormData()), {});
    });

    it('Should correctly convert a FormData instance with single-keys', () => {
        const frm = new FormData();
        frm.append('hello', 'world');
        frm.append('world', 'hello');
        assert.deepEqual(toObject(frm), {
            hello: 'world',
            world: 'hello',
        });
    });

    it('Should correctly convert a FormData instance with multiple values for the same key', () => {
        const formData = new FormData();
        formData.append('name', 'Alice');
        formData.append('hobbies', 'reading');
        formData.append('hobbies', 'writing');
        formData.append('emptyField', '');

        assert.deepEqual(toObject(formData), {
            name: 'Alice',
            hobbies: ['reading', 'writing'],
            emptyField: '',
        });
    });

    it('Should handle FormData with File objects', () => {
        const formData = new FormData();
        const file = new File(['content'], 'example.txt', {type: 'text/plain'});
        formData.append('file', file);

        const result = toObject(formData);
        assert.ok(result.file instanceof File);
        assert.equal(result.file.name, 'example.txt');
    });

    it('Should handle case-sensitive keys', () => {
        const formData = new FormData();
        formData.append('Key', 'value1');
        formData.append('key', 'value2');

        assert.deepEqual(toObject(formData), {
            Key: 'value1',
            key: 'value2',
        });
    });

    it('Should handle multiple empty values for the same key', () => {
        const formData = new FormData();
        formData.append('emptyField', '');
        formData.append('emptyField', '');

        assert.deepEqual(toObject(formData), {
            emptyField: ['', ''],
        });
    });

    it('Should handle a large number of entries', () => {
        const formData = new FormData();
        for (let i = 0; i < 1000; i++) {
            formData.append(`key${i}`, `value${i}`);
        }

        const result = toObject(formData);
        for (let i = 0; i < 1000; i++) {
            assert.equal(result[`key${i}`], `value${i}`);
        }
    });

    it('Should correctly convert strings that represent booleans', () => {
        const formData = new FormData();
        formData.append('isHuman', 'true');
        formData.append('isRobot', 'false');

        assert.deepEqual(toObject(formData), {
            isHuman: true,
            isRobot: false,
        });
    });

    it('Should correctly convert strings that represent numbers', () => {
        const formData = new FormData();
        formData.append('age', '30');
        formData.append('height', '180.5');

        assert.deepEqual(toObject(formData), {
            age: 30,
            height: 180.5,
        });
    });

    // Handling mixed types
    it('Should handle mixed values (strings, numbers, booleans)', () => {
        const formData = new FormData();
        formData.append('username', 'john_doe');
        formData.append('isAdmin', 'true');
        formData.append('age', '45');
        formData.append('score', '89.2');
        formData.append('emptyField', '');

        assert.deepEqual(toObject(formData), {
            username: 'john_doe',
            isAdmin: true,
            age: 45,
            score: 89.2,
            emptyField: '',
        });
    });

    it('Should handle strings that resemble numbers but are not numbers', () => {
        const formData = new FormData();
        formData.append('version', 'v1.0');
        formData.append('age', '123'); // leading zeros

        assert.deepEqual(toObject(formData), {
            version: 'v1.0', // this should remain a string
            age: 123,        // this should be parsed as a number
        });
    });

    it('Should handle strings with whitespace that resemble numbers', () => {
        const formData = new FormData();
        formData.append('whitespaceNumber', ' 42 ');
        formData.append('whitespaceBoolean', ' false ');

        assert.deepEqual(toObject(formData), {
            whitespaceNumber: 42,      // should be parsed as number
            whitespaceBoolean: ' false ',  // should be parsed as boolean
        });
    });

    it('Should handle multiple boolean values for the same key', () => {
        const formData = new FormData();
        formData.append('enabled', 'true');
        formData.append('enabled', 'false');

        assert.deepEqual(toObject(formData), {
            enabled: [true, false], // should store both as boolean values in an array
        });
    });

    it('Should handle multiple numeric values for the same key', () => {
        const formData = new FormData();
        formData.append('scores', '100');
        formData.append('scores', '200');
        formData.append('scores', '300');

        assert.deepEqual(toObject(formData), {
            scores: [100, 200, 300], // should store all as numbers in an array
        });
    });

    it('Should handle complex nested keys using arrays', () => {
        const formData = new FormData();
        formData.append('user[0].name', 'Alice');
        formData.append('user[0].age', '30');
        formData.append('user[1].name', 'Bob');
        formData.append('user[1].age', '25');

        assert.deepEqual(toObject(formData), {
            user: [
                {name: 'Alice', age: 30},
                {name: 'Bob', age: 25},
            ],
        });
    });

    it('Should handle complex nested keys using arrays (pt 2)', () => {
        const formData = new FormData();
        formData.append('user[0].name', 'Alice');
        formData.append('user[1].age', '25');

        assert.deepEqual(toObject(formData), {
            user: [
                {name: 'Alice'},
                {age: 25},
            ],
        });
    });

    it('Should handle complex nested keys using arrays (pt 3)', () => {
        const formData = new FormData();
        formData.append('user[0].name', 'Alice');
        formData.append('user[1].age', '25');
        formData.append('enabled', 'false');
        formData.append('config.isGood', 'true');
        formData.append('config.amount', ' 50 ');

        assert.deepEqual(toObject(formData), {
            user: [
                {name: 'Alice'},
                {age: 25},
            ],
            enabled: false,
            config: {
                isGood: true,
                amount: 50,
            },
        });
    });

    it('Should handle empty string keys and return an empty string', () => {
        const formData = new FormData();
        formData.append('', 'emptyKeyTest');

        assert.deepEqual(toObject(formData), {
            '': 'emptyKeyTest', // empty key, should work and map to an empty key
        });
    });

    it('Should handle mixed array values (numbers, booleans, strings)', () => {
        const formData = new FormData();
        formData.append('mixedArray', '123');
        formData.append('mixedArray', 'true');
        formData.append('mixedArray', 'hello');

        assert.deepEqual(toObject(formData), {
            mixedArray: [123, true, 'hello'], // mixed types should be preserved in the array
        });
    });

    it('Should handle deeply nested keys using dotted notation', () => {
        const formData = new FormData();
        formData.append('config.database.host', 'localhost');
        formData.append('config.database.port', '5432');
        formData.append('config.cache.enabled', 'true');

        assert.deepEqual(toObject(formData), {
            config: {
                database: {
                    host: 'localhost',
                    port: 5432,
                },
                cache: {
                    enabled: true,
                },
            },
        });
    });

    it('Should handle numeric values with leading zeros', () => {
        const formData = new FormData();
        formData.append('zipCode', '000123');
        formData.append('phoneNumber', '0123456789');

        assert.deepEqual(toObject(formData), {
            zipCode: 123,
            phoneNumber: 123456789,
        });
    });

    it('Should handle empty FormData values and preserve them', () => {
        const formData = new FormData();
        formData.append('emptyField', '');

        assert.deepEqual(toObject(formData), {
            emptyField: '', // empty string should be preserved
        });
    });

    it('Should handle boolean-like values in different cases', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'True');
        formData.append('isVisible', 'FALSE');

        assert.deepEqual(toObject(formData), {
            isEnabled: true,  // should treat 'True' as boolean true
            isVisible: false, // should treat 'FALSE' as boolean false
        });
    });

    it('Should handle keys with special characters', () => {
        const formData = new FormData();
        formData.append('user!@#$', 'special');
        formData.append('config&*()', 'chars');

        assert.deepEqual(toObject(formData), {
            'user!@#$': 'special',
            'config&*()': 'chars',
        });
    });

    it('Should handle non-string values in FormData', () => {
        const formData = new FormData();
        const file = new File(['content'], 'file.txt');
        formData.append('file', file);
        formData.append('blob', new Blob(['blob-content'], {type: 'text/plain'}));

        const result = toObject(formData);
        assert.ok(result.file instanceof File);
        assert.ok(result.blob instanceof Blob);
    });


    it('Should handle mixed types for the same key', () => {
        const formData = new FormData();
        formData.append('mixedKey', '42');
        formData.append('mixedKey', 'true');
        formData.append('mixedKey', 'text');

        assert.deepEqual(toObject(formData), {
            mixedKey: [42, true, 'text'],
        });
    });


    it('Should handle deeply nested arrays', () => {
        const formData = new FormData();
        formData.append('level1[0].level2[0].value', 'deep');
        formData.append('level1[0].level2[1].value', 'deeper');
        formData.append('level1[1].level2[0].value', 'deepest');

        assert.deepEqual(toObject(formData), {
            level1: [
                {level2: [{value: 'deep'}, {value: 'deeper'}]},
                {level2: [{value: 'deepest'}]},
            ],
        });
    });


    it('Should handle numbers in scientific notation', () => {
        const formData = new FormData();
        formData.append('scientific', '1.23e10');

        assert.deepEqual(toObject(formData), {
            scientific: 1.23e10,
        });
    });


    it('Should handle mixed case boolean-like strings', () => {
        const formData = new FormData();
        formData.append('caseTest1', 'tRuE');
        formData.append('caseTest2', 'FaLsE');

        assert.deepEqual(toObject(formData), {
            caseTest1: true,
            caseTest2: false,
        });
    });


    it('Should handle multiple values for an empty string key', () => {
        const formData = new FormData();
        formData.append('', 'first');
        formData.append('', 'second');

        assert.deepEqual(toObject(formData), {
            '': ['first', 'second'],
        });
    });


    it('Should handle date-like strings without converting them', () => {
        const formData = new FormData();
        formData.append('startDate', '2023-12-25');
        formData.append('endDate', '2023-12-31T12:00:00Z');

        assert.deepEqual(toObject(formData), {
            startDate: '2023-12-25',           // Should remain a string
            endDate: '2023-12-31T12:00:00Z',   // Should remain a string
        });
    });


    it('Should handle multiple File objects for the same key', () => {
        const formData = new FormData();
        const file1 = new File(['content1'], 'file1.txt');
        const file2 = new File(['content2'], 'file2.txt');
        formData.append('files', file1);
        formData.append('files', file2);

        const result = toObject(formData);
        assert.ok(Array.isArray(result.files));
        assert.equal(result.files.length, 2);
        assert.ok(result.files[0] instanceof File);
        assert.ok(result.files[1] instanceof File);
    });


    it('Should handle Blob objects as values', () => {
        const formData = new FormData();
        const blob = new Blob(['blob-content'], {type: 'text/plain'});
        formData.append('blobField', blob);

        const result = toObject(formData);
        assert.ok(result.blobField instanceof Blob);
    });

    it('Should respect config.raw and not convert specified keys', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'true');
        formData.append('age', '30');
        formData.append('rawString', '30');  // should remain as a string

        assert.deepEqual(toObject(formData, {raw: ['rawString']}), {
            isEnabled: true,   // 'true' should be converted to boolean
            age: 30,           // '30' should be converted to number
            rawString: '30',   // '30' should remain a string due to raw config
        });
    });

    it('Should not convert multiple keys specified in config.raw', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'true');
        formData.append('age', '30');
        formData.append('rawBoolean', 'false');  // should remain as a string
        formData.append('rawNumber', '123');     // should remain as a string

        assert.deepEqual(toObject(formData, {raw: ['rawBoolean', 'rawNumber']}), {
            isEnabled: true,     // 'true' should be converted to boolean
            age: 30,             // '30' should be converted to number
            rawBoolean: 'false', // 'false' should remain a string
            rawNumber: '123',    // '123' should remain a string
        });
    });

    it('Should handle raw key for nested properties', () => {
        const formData = new FormData();
        formData.append('config.isEnabled', 'true');
        formData.append('config.port', '8080');
        formData.append('config.rawKey', '123');  // should remain a string

        assert.deepEqual(toObject(formData, {raw: ['config.rawKey']}), {
            config: {
                isEnabled: true,   // 'true' should be converted to boolean
                port: 8080,        // '8080' should be converted to number
                rawKey: '123',     // '123' should remain a string
            },
        });
    });

    it('Should handle raw for array-like keys', () => {
        const formData = new FormData();
        formData.append('user[0].name', 'Alice');
        formData.append('user[0].age', '30');   // should be converted to number
        formData.append('user[1].name', 'Bob');
        formData.append('user[1].age', '40');   // should remain a string

        assert.deepEqual(toObject(formData, {raw: ['user[1].age']}), {
            user: [
                {name: 'Alice', age: 30},
                {name: 'Bob', age: '40'},  // age should remain a string due to raw config
            ],
        });
    });

    it('Should not affect keys not present in config.raw', () => {
        const formData = new FormData();
        formData.append('name', 'John Doe');
        formData.append('age', '45');
        formData.append('isAdmin', 'true');

        assert.deepEqual(toObject(formData, {raw: ['notPresent']}), {
            name: 'John Doe',   // normal string
            age: 45,            // '45' should be converted to number
            isAdmin: true,      // 'true' should be converted to boolean
        });
    });

    it('Should respect config.raw and not convert even boolean-like strings', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'true');
        formData.append('isVisible', 'false');

        assert.deepEqual(toObject(formData, {raw: ['isEnabled', 'isVisible']}), {
            isEnabled: 'true',  // should remain a string
            isVisible: 'false', // should remain a string
        });
    });

    it('Should handle mixed config and non-conversion for raw keys', () => {
        const formData = new FormData();
        formData.append('enabled', 'true');
        formData.append('score', '100');
        formData.append('config.debug', 'false');
        formData.append('config.timeout', '30');

        assert.deepEqual(toObject(formData, {raw: ['config.debug', 'score']}), {
            enabled: true,         // converted to boolean
            score: '100',          // should remain a string
            config: {
                debug: 'false',    // should remain a string
                timeout: 30,       // converted to number
            },
        });
    });

    it('Should correctly handle multiple raw values with different types', () => {
        const formData = new FormData();
        formData.append('count', '20');
        formData.append('isValid', 'true');
        formData.append('rawString', '10');
        formData.append('rawBoolean', 'false');

        assert.deepEqual(toObject(formData, {raw: ['rawString', 'rawBoolean']}), {
            count: 20,             // '20' converted to number
            isValid: true,         // 'true' converted to boolean
            rawString: '10',       // '10' remains a string due to raw config
            rawBoolean: 'false',   // 'false' remains a string due to raw config
        });
    });

    it('Should correctly handle raw being set to true', () => {
        const formData = new FormData();
        formData.append('count', '20');
        formData.append('isValid', 'true');
        formData.append('rawString', '10');
        formData.append('rawBoolean', 'false');

        assert.deepEqual(toObject(formData, {raw: true}), {
            count: '20',           // '20' converted to number
            isValid: 'true',       // 'true' converted to boolean
            rawString: '10',       // '10' remains a string due to raw config
            rawBoolean: 'false',   // 'false' remains a string due to raw config
        });
    });

    describe('single option', () => {
        it('Should ensure the "single" option keeps a single value even with multiple form entries', () => {
            const formData = new FormData();
            formData.append('action', 'save');
            formData.append('action', 'save');

            assert.deepEqual(toObject(formData, {single: ['action']}), {
                action: 'save',
            });
        });

        it('Should handle multiple single fields and ensure they are not converted into arrays', () => {
            const formData = new FormData();
            formData.append('status', 'active');
            formData.append('status', 'inactive');
            formData.append('action', 'save');
            formData.append('action', 'reset');

            assert.deepEqual(toObject(formData, {single: ['status', 'action']}), {
                status: 'inactive',
                action: 'reset',
            });
        });
    });
});
