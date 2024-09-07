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
});
