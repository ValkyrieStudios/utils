/* eslint-disable max-len */

import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import shorten from '../../../lib/string/shorten';

describe('String - shorten', () => {
    it('Return empty string when passed nothing', () => {
        // @ts-ignore
        expect(shorten()).toBe('');
    });

    it('Return empty string when passed a non string value', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            // @ts-ignore
            expect(shorten(el)).toBe('');
        }
    });

    it('Return original string when passed a non-numeric length', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            if (el === undefined) continue;
            expect(shorten('  Mama Mia   ', el)).toBe('  Mama Mia   ');
        }
    });

    it('Return original string when passed a non string postfix', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            if (el === undefined) continue;
            expect(shorten('  Mama Mia   ', 10, el)).toBe('  Mama Mia   ');
        }
    });

    it('Returns original text when text is not beyond boundaries of length', () => {
        expect(shorten('Mama Mia', 50)).toBe('Mama Mia');
    });

    it('Autotrims text and returns autotrimmed text when text is not beyond boundaries of length', () => {
        expect(shorten('   Mama Mia    ', 10)).toBe('Mama Mia');
    });

    it('Autotrims text and returns autotrimmed shortened text when text is beyond boundaries of length', () => {
        expect(shorten('  Mama Mia  ', 4)).toBe('Mama...');
    });

    it('Uses ... as the default postfix', () => {
        expect(shorten('To the moon and beyond', 11)).toBe('To the moon...');
    });

    it('Allows setting a custom postfix', () => {
        expect(shorten('To the moon and beyond', 11, '..')).toBe('To the moon..');
    });

    it('Allows setting an empty string as postfix', () => {
        expect(shorten('To the moon and beyond', 11, '')).toBe('To the moon');
    });

    it('Does not autotrim the postfix', () => {
        expect(shorten('To the moon and beyond', 11, ' ')).toBe('To the moon ');
    });

    it('Truncates without cutting words when truncate_words is false', () => {
        expect(shorten('To the moon and beyond', 11, '...', false)).toBe('To the moon...');
    });

    it('Truncates and retains whole words when truncate_words is false and text is shorter than specified length', () => {
        expect(shorten('To the moon and beyond', 20, '...', false)).toBe('To the moon and...');
        expect(
            shorten('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam arcu lacinia. Nullam arcu eros, euismod ut velit aliquam, congue pharetra nulla. Sed et laoreet mi. Nam eros erat, molestie et nisl a, vestibulum varius leo. Cras a ullamcorper odio, eget accumsan neque.', 100, '...', false)
        ).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut...');
        expect(
            shorten('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam arcu lacinia. Nullam arcu eros, euismod ut velit aliquam, congue pharetra nulla. Sed et laoreet mi. Nam eros erat, molestie et nisl a, vestibulum varius leo. Cras a ullamcorper odio, eget accumsan neque.', 250, '...', false)
        ).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel,...');
        expect(
            shorten('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam arcu lacinia. Nullam arcu eros, euismod ut velit aliquam, congue pharetra nulla. Sed et laoreet mi. Nam eros erat, molestie et nisl a, vestibulum varius leo. Cras a ullamcorper odio, eget accumsan neque.', 500, '...', false)
        ).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mi sed elit auctor efficitur ut vel diam. Morbi non ultrices lectus. Nunc nec semper lectus. Nunc pellentesque molestie vehicula. Suspendisse at leo tempor, venenatis velit vel, vehicula mi. Integer lectus libero, rhoncus at efficitur id, suscipit sit amet lacus. Cras iaculis laoreet pellentesque. Aliquam neque elit, accumsan id venenatis eget, convallis eget libero. Quisque rhoncus sapien pharetra turpis facilisis, ac aliquam...');
    });

    it('Returns original text if text length is equal to specified length and truncate_words is false', () => {
        expect(shorten('To the moon', 11, '...', false)).toBe('To the moon');
    });

    it('Truncates correctly with a custom postfix when truncate_words is false', () => {
        expect(shorten('To the moon and beyond', 11, '..', false)).toBe('To the moon..');
    });

    it('Handles edge cases when truncate_words is false', () => {
        expect(shorten('To the moon', 2, '...', false)).toBe('To...');
        expect(shorten('To the moon', 5, '...', false)).toBe('To...');
    });

    it('Handles edge case where word is exactly ending on boundary when truncate_words is false', () => {
        expect(shorten('To the moon', 6, '...', false)).toBe('To the...');
    });

    it('Handles text with multiple spaces correctly when truncate_words is false', () => {
        expect(shorten('To the    moon and beyond', 12, '...', false)).toBe('To the...');
        expect(shorten('To the    moon and beyond', 18, '...', false)).toBe('To the    moon and...');
    });
});
