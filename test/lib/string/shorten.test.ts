import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import shorten          from '../../../lib/string/shorten';

describe('String - shorten', () => {
    it('Return empty string when passed nothing', () => {
        /* @ts-ignore */
        assert.equal(shorten(), '');
    });

    it('Return empty string when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            /* @ts-ignore */
            assert.equal(shorten(el), '');
        }
    });

    it('Return original string when passed a non-numeric length', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            if (el === undefined) continue;
            assert.equal(shorten('  Mama Mia   ', el), '  Mama Mia   ');
        }
    });

    it('Return original string when passed a non string postfix', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            assert.equal(shorten('  Mama Mia   ', 10, el), '  Mama Mia   ');
        }
    });

    it('Returns original text when text is not beyond boundaries of length', () => {
        assert.equal(shorten('Mama Mia', 50), 'Mama Mia');
    });

    it('Autotrims text and returns autotrimmed text when text is not beyond boundaries of length', () => {
        assert.equal(shorten('   Mama Mia    ', 10), 'Mama Mia');
    });

    it('Autotrims text and returns autotrimmed shortened text when text is beyond boundaries of length', () => {
        assert.equal(shorten('  Mama Mia  ', 4), 'Mama...');
    });

    it('Uses ... as the default postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11), 'To the moon...');
    });

    it('Allows setting a custom postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11, '..'), 'To the moon..');
    });

    it('Allows setting an empty string as postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11, ''), 'To the moon');
    });

    it('Does not autotrim the postfix', () => {
        assert.equal(shorten('To the moon and beyond', 11, ' '), 'To the moon ');
    });

    it('Truncates without cutting words when truncate_words is false', () => {
        assert.equal(shorten('To the moon and beyond', 11, '...', false), 'To the moon...');
    });

    it('Truncates and retains whole words when truncate_words is false and text is shorter than specified length', () => {
        assert.equal(shorten('To the moon and beyond', 20, '...', false), 'To the moon and...');
        assert.equal(
            shorten('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam arcu lacinia. Nullam arcu eros, euismod ut velit aliquam, congue pharetra nulla. Sed et laoreet mi. Nam eros erat, molestie et nisl a, vestibulum varius leo. Cras a ullamcorper odio, eget accumsan neque.', 100, '...', false), /* eslint-disable-line max-len */
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut...'
        );
        assert.equal(
            shorten('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam arcu lacinia. Nullam arcu eros, euismod ut velit aliquam, congue pharetra nulla. Sed et laoreet mi. Nam eros erat, molestie et nisl a, vestibulum varius leo. Cras a ullamcorper odio, eget accumsan neque.', 250, '...', false), /* eslint-disable-line max-len */
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel,...' /* eslint-disable-line max-len */
        );

        assert.equal(
            shorten('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam arcu lacinia. Nullam arcu eros, euismod ut velit aliquam, congue pharetra nulla. Sed et laoreet mi. Nam eros erat, molestie et nisl a, vestibulum varius leo. Cras a ullamcorper odio, eget accumsan neque.', 500, '...', false), /* eslint-disable-line max-len */
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam...' /* eslint-disable-line max-len */
        );
    });

    it('Returns original text if text length is equal to specified length and truncate_words is false', () => {
        assert.equal(shorten('To the moon', 11, '...', false), 'To the moon');
    });

    it('Truncates correctly with a custom postfix when truncate_words is false', () => {
        assert.equal(shorten('To the moon and beyond', 11, '..', false), 'To the moon..');
    });

    it('Handles edge cases when truncate_words is false', () => {
        assert.equal(shorten('To the moon', 2, '...', false), 'To...');
        assert.equal(shorten('To the moon', 5, '...', false), 'To...');
    });

    it('Handles text with multiple spaces correctly when truncate_words is false', () => {
        assert.equal(shorten('To the    moon and beyond', 12, '...', false), 'To the...');
        assert.equal(shorten('To the    moon and beyond', 18, '...', false), 'To the    moon and...');
    });
});
