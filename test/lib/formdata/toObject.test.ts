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
        formData.append('age', '123');

        assert.deepEqual(toObject(formData), {
            version: 'v1.0',
            age: 123,
        });
    });

    it('Should handle strings with whitespace that resemble numbers', () => {
        const formData = new FormData();
        formData.append('whitespaceNumber', ' 42 ');
        formData.append('whitespaceBoolean', ' false ');

        assert.deepEqual(toObject(formData), {
            whitespaceNumber: 42,
            whitespaceBoolean: ' false ',
        });
    });

    it('Should handle multiple boolean values for the same key', () => {
        const formData = new FormData();
        formData.append('enabled', 'true');
        formData.append('enabled', 'false');

        assert.deepEqual(toObject(formData), {
            enabled: [true, false],
        });
    });

    it('Should handle multiple numeric values for the same key', () => {
        const formData = new FormData();
        formData.append('scores', '100');
        formData.append('scores', '200');
        formData.append('scores', '300');

        assert.deepEqual(toObject(formData), {
            scores: [100, 200, 300],
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

    it('Should handle mixed array values (numbers, booleans, strings)', () => {
        const formData = new FormData();
        formData.append('mixedArray', '123');
        formData.append('mixedArray', 'true');
        formData.append('mixedArray', 'hello');

        assert.deepEqual(toObject(formData), {
            mixedArray: [123, true, 'hello'],
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
            emptyField: '',
        });
    });

    it('Should handle boolean-like values in different cases', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'True');
        formData.append('isVisible', 'FALSE');

        assert.deepEqual(toObject(formData), {
            isEnabled: true,
            isVisible: false,
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
        formData.append('caseTest1', 'True');
        formData.append('caseTest2', 'False');
        formData.append('caseTest3', 'TRUE');
        formData.append('caseTest4', 'FALSE');

        assert.deepEqual(toObject(formData), {
            caseTest1: true,
            caseTest2: false,
            caseTest3: true,
            caseTest4: false,
        });
    });

    it('Should handle date-like strings correctly', () => {
        const formData = new FormData();
        formData.append('startDate', '2023-12-25');
        formData.append('startDate2', '2023-12-49T12:00:00.000Z');
        formData.append('endDate', '2023-12-31T12:00:00Z');
        formData.append('endDate2', '2023-12-31T12:00:00.987Z');

        assert.deepEqual(toObject(formData), {
            startDate: '2023-12-25',
            startDate2: '2023-12-49T12:00:00.000Z',
            endDate: new Date('2023-12-31T12:00:00Z'),
            endDate2: new Date('2023-12-31T12:00:00.987Z'),
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
        formData.append('rawString', '30');

        assert.deepEqual(toObject(formData, {raw: ['rawString']}), {
            isEnabled: true,
            age: 30,
            rawString: '30',
        });
    });

    it('Should not convert multiple keys specified in config.raw', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'true');
        formData.append('age', '30');
        formData.append('rawBoolean', 'false');
        formData.append('rawNumber', '123');

        assert.deepEqual(toObject(formData, {raw: ['rawBoolean', 'rawNumber']}), {
            isEnabled: true,
            age: 30,
            rawBoolean: 'false',
            rawNumber: '123',
        });
    });

    it('Should handle raw key for nested properties', () => {
        const formData = new FormData();
        formData.append('config.isEnabled', 'true');
        formData.append('config.port', '8080');
        formData.append('config.rawKey', '123');

        assert.deepEqual(toObject(formData, {raw: ['config.rawKey']}), {
            config: {
                isEnabled: true,
                port: 8080,
                rawKey: '123',
            },
        });
    });

    it('Should handle raw for array-like keys', () => {
        const formData = new FormData();
        formData.append('user[0].name', 'Alice');
        formData.append('user[0].age', '30');
        formData.append('user[1].name', 'Bob');
        formData.append('user[1].age', '40');

        assert.deepEqual(toObject(formData, {raw: ['user[1].age']}), {
            user: [
                {name: 'Alice', age: 30},
                {name: 'Bob', age: '40'},
            ],
        });
    });

    it('Should not affect keys not present in config.raw', () => {
        const formData = new FormData();
        formData.append('name', 'John Doe');
        formData.append('age', '45');
        formData.append('isAdmin', 'true');

        assert.deepEqual(toObject(formData, {raw: ['notPresent']}), {
            name: 'John Doe',
            age: 45,
            isAdmin: true,
        });
    });

    it('Should respect config.raw and not convert even boolean-like strings', () => {
        const formData = new FormData();
        formData.append('isEnabled', 'true');
        formData.append('isVisible', 'false');

        assert.deepEqual(toObject(formData, {raw: ['isEnabled', 'isVisible']}), {
            isEnabled: 'true',
            isVisible: 'false',
        });
    });

    it('Should handle mixed config and non-conversion for raw keys', () => {
        const formData = new FormData();
        formData.append('enabled', 'true');
        formData.append('score', '100');
        formData.append('config.debug', 'false');
        formData.append('config.timeout', '30');

        assert.deepEqual(toObject(formData, {raw: ['config.debug', 'score']}), {
            enabled: true,
            score: '100',
            config: {
                debug: 'false',
                timeout: 30,
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
            count: 20,
            isValid: true,
            rawString: '10',
            rawBoolean: 'false',
        });
    });

    it('Should correctly handle raw being set to true', () => {
        const formData = new FormData();
        formData.append('count', '20');
        formData.append('isValid', 'true');
        formData.append('rawString', '10');
        formData.append('rawBoolean', 'false');

        assert.deepEqual(toObject(formData, {raw: true}), {
            count: '20',
            isValid: 'true',
            rawString: '10',
            rawBoolean: 'false',
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

    describe('with normalization options', () => {
        it('Should correctly handle normalization of booleans', () => {
            const formData = new FormData();
            formData.append('isHuman', 'true');
            formData.append('isRobot', 'false');

            assert.deepEqual(toObject(formData, {normalize_bool: true}), {
                isHuman: true,
                isRobot: false,
            });

            assert.deepEqual(toObject(formData, {normalize_bool: false}), {
                isHuman: 'true',
                isRobot: 'false',
            });
        });

        it('Should correctly handle normalization of numbers', () => {
            const formData = new FormData();
            formData.append('age', '25');
            formData.append('height', '180.5');
            formData.append('nonNumber', 'abc123');

            assert.deepEqual(toObject(formData, {normalize_number: true}), {
                age: 25,
                height: 180.5,
                nonNumber: 'abc123',
            });

            assert.deepEqual(toObject(formData, {normalize_number: false}), {
                age: '25',
                height: '180.5',
                nonNumber: 'abc123',
            });
        });

        it('Should correctly handle normalization of dates', () => {
            const formData = new FormData();
            formData.append('startDate', '2023-12-25');
            formData.append('endDate', '2023-12-31T12:00:00.987Z');

            assert.deepEqual(toObject(formData, {normalize_date: true}), {
                startDate: '2023-12-25',
                endDate: new Date('2023-12-31T12:00:00.987Z'),
            });

            assert.deepEqual(toObject(formData, {normalize_date: false}), {
                startDate: '2023-12-25',
                endDate: '2023-12-31T12:00:00.987Z',
            });
        });

        it('Should handle a mix of boolean, number, and date normalization', () => {
            const formData = new FormData();
            formData.append('isEnabled', 'true');
            formData.append('age', '42');
            formData.append('birthDate', '1990-01-01T07:39:40Z');

            assert.deepEqual(toObject(formData, {normalize_bool: true, normalize_number: true, normalize_date: true}), {
                isEnabled: true,
                age: 42,
                birthDate: new Date('1990-01-01T07:39:40Z'),
            });

            assert.deepEqual(toObject(formData, {normalize_bool: false, normalize_number: false, normalize_date: false}), {
                isEnabled: 'true',
                age: '42',
                birthDate: '1990-01-01T07:39:40Z',
            });
        });

        it('Should correctly handle raw keys with normalization enabled', () => {
            const formData = new FormData();
            formData.append('rawBoolean', 'true');
            formData.append('rawNumber', '123');
            formData.append('rawDate', '2023-12-31T12:00:00.987Z');

            assert.deepEqual(toObject(formData, {
                raw: ['rawBoolean', 'rawNumber', 'rawDate'],
                normalize_bool: true,
                normalize_number: true,
                normalize_date: true,
            }), {
                rawBoolean: 'true',
                rawNumber: '123',
                rawDate: '2023-12-31T12:00:00.987Z',
            });
        });

        it('Should handle mixed raw and normalized values', () => {
            const formData = new FormData();
            formData.append('isHuman', 'true');
            formData.append('age', '30');
            formData.append('startDate', '2023-12-25T12:00:00.000Z');
            formData.append('rawKey', 'false');

            assert.deepEqual(toObject(formData, {raw: ['rawKey'], normalize_bool: true, normalize_number: true, normalize_date: true}), {
                isHuman: true,
                age: 30,
                startDate: new Date('2023-12-25T12:00:00.000Z'),
                rawKey: 'false',
            });
        });

        it('Should correctly handle single-value keys with normalization enabled', () => {
            const formData = new FormData();
            formData.append('action', 'save');
            formData.append('action', 'save');

            assert.deepEqual(toObject(formData, {single: ['action'], normalize_bool: true, normalize_number: true}), {
                action: 'save',
            });
        });

        it('Should handle multiple normalization options together', () => {
            const formData = new FormData();
            formData.append('isEnabled', 'true');
            formData.append('age', '45');
            formData.append('height', '1.85');
            formData.append('startDate', '2024-02-09T12:34:56Z');
            formData.append('rawField', 'false');

            const result = toObject(formData, {
                normalize_bool: true,
                normalize_date: true,
                normalize_number: true,
                raw: ['rawField'],
            });

            assert.deepEqual(result, {
                isEnabled: true,
                age: 45,
                height: 1.85,
                startDate: new Date('2024-02-09T12:34:56Z'),
                rawField: 'false',
            });
        });

        it('Should handle normalization in nested objects', () => {
            const form = new FormData();
            form.append('pincode', '0123');
            form.append('enabled', 'false');
            form.append('config.isGood', 'true');
            form.append('config.amount', ' 50 ');
            form.append('config.createdAt', '2024-02-09T12:34:56Z');

            assert.deepEqual(toObject(form, {raw: ['pincode']}), {
                pincode: '0123',
                enabled: false,
                config: {
                    isGood: true,
                    amount: 50,
                    createdAt: new Date('2024-02-09T12:34:56Z'),
                },
            });

            assert.deepEqual(toObject(form, {raw: ['pincode'], normalize_bool: false}), {
                pincode: '0123',
                enabled: 'false',
                config: {
                    isGood: 'true',
                    amount: 50,
                    createdAt: new Date('2024-02-09T12:34:56Z'),
                },
            });

            assert.deepEqual(toObject(form, {normalize_bool: false, normalize_number: false}), {
                pincode: '0123',
                enabled: 'false',
                config: {
                    isGood: 'true',
                    amount: ' 50 ',
                    createdAt: new Date('2024-02-09T12:34:56Z'),
                },
            });

            assert.deepEqual(toObject(form, {normalize_bool: false, normalize_number: false, normalize_date: false}), {
                pincode: '0123',
                enabled: 'false',
                config: {
                    isGood: 'true',
                    amount: ' 50 ',
                    createdAt: '2024-02-09T12:34:56Z',
                },
            });
        });
    });
});
