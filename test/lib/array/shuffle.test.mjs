'use strict';

/* eslint-disable max-len */

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import shuffle          from '../../../lib/array/shuffle.mjs';

describe('Array - shuffle', () => {
    it('Does nothing and doesnt touch passed variable when passed a non-array or empty array', () => {
        for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
            const el_copy = el;
            shuffle(el);
            assert.deepEqual(el, el_copy);
        }
    });

    it('Should shuffle an array of primitives (numbers)', () => {
        const el = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        shuffle(el);
        assert.notDeepEqual(el, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.equal(el.length, 10);

        const map = {};
        for (const v of el) map[v] = v;
        assert.deepEqual(Object.values(map), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('Should shuffle an array of primitives (numbers) in a unique way (benchmark 100 shuffles with a 10 number array)', () => {
        const map = new Map();
        for (let i = 0; i < 100; i++) {
            const el = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            shuffle(el);
            map.set(el, el);
        }
        assert.ok(map.size > 90);
    });

    it('Should shuffle an array of primitives (strings) in a unique way (benchmark 100 shuffles with a 10 number array)', () => {
        const map = new Map();
        for (let i = 0; i < 100; i++) {
            const el = [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                'Phasellus pulvinar diam id commodo condimentum. Etiam at erat vel urna lobortis porta. Curabitur vulputate tellus a tellus feugiat luctus. Nulla sem turpis, placerat id arcu et, auctor rutrum sapien. Donec vehicula lacus nisi, vel bibendum lorem dapibus a. Quisque blandit nulla nec pretium bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus est, tincidunt ut nibh in, consectetur tristique sapien. Praesent feugiat purus quis enim condimentum, sit amet mattis sem cursus. Aenean sodales tortor justo, in ornare velit lobortis at. Fusce aliquam felis sed ligula dignissim, luctus malesuada ipsum dictum. Nulla pretium, tortor rhoncus auctor vehicula, nisi elit convallis orci, vel ultrices leo lacus quis ante. Integer viverra fringilla nunc, in dignissim felis aliquam non. Pellentesque nec viverra risus.',
                'Nunc eget placerat dolor. Integer lobortis eros ac interdum tincidunt. Maecenas vulputate tortor metus, quis fermentum nisi facilisis ut. Phasellus cursus quis ex ut finibus. Maecenas nulla lectus, rutrum eget efficitur sed, vestibulum rutrum ante. Donec rutrum efficitur orci, id ullamcorper ipsum dictum id. Vivamus eu felis at dolor malesuada pellentesque. Fusce sit amet nisi a dolor tempus laoreet. Phasellus vehicula odio vel efficitur auctor. Nam ac lacus condimentum sem vestibulum volutpat.',
                'Curabitur bibendum posuere arcu, a maximus nisl fringilla id. Proin aliquam aliquet neque id vestibulum. Sed efficitur felis in ullamcorper ultricies. Cras pharetra massa orci, id vestibulum ex molestie ac. Ut pretium mattis ante a pulvinar. Donec eu felis in nisi varius volutpat. Nam dignissim laoreet feugiat. Praesent sed lectus a enim tincidunt imperdiet sit amet at ante. Aliquam erat volutpat. Vestibulum non nisl id eros elementum eleifend a vel nulla. Pellentesque euismod vel est aliquam condimentum. Aliquam pellentesque orci odio, sit amet consequat magna luctus non.',
                'Donec vel lorem eget velit tristique varius. Curabitur sagittis odio magna, non molestie ligula egestas vel. Proin lobortis lorem sit amet mi malesuada, eu maximus augue vestibulum. Ut bibendum ullamcorper ipsum eget facilisis. Nulla maximus eleifend tempus. Phasellus eget pretium quam, id tempus nibh. Praesent tempor ultricies sapien ut tempus. Pellentesque at lorem enim. Donec mollis suscipit augue, in pulvinar tortor consectetur id. Integer commodo erat sed lorem ultricies euismod. Mauris eu porttitor ipsum. Integer id finibus enim. In eros purus, euismod facilisis vestibulum rhoncus, ornare et tellus.',
                'Sed vitae orci quis elit dapibus pharetra. Morbi sed tristique mi, et pulvinar odio. Nulla erat sem, vehicula in tincidunt lobortis, ultrices sed justo. Suspendisse hendrerit sed erat eget volutpat. Etiam nec nulla ex. Aliquam odio quam, mollis nec orci vitae, scelerisque vulputate mauris. Etiam elementum metus mi, vitae scelerisque urna dapibus sit amet. Vivamus sit amet tortor accumsan, ornare diam id, posuere erat. Mauris consequat, ligula quis faucibus suscipit, nisi mi consectetur sapien, at pretium nulla massa ut nulla. Vivamus vulputate aliquam ullamcorper. In consequat consectetur egestas. Praesent rutrum dolor at quam rutrum luctus.',
                'Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce aliquam nibh eget nisi varius, sed pellentesque sapien sagittis. Morbi sit amet lacus eget magna aliquam congue. Quisque sit amet nisl et justo sodales faucibus eu non massa. In non ornare ex, tristique ultrices quam. Suspendisse potenti. Fusce et mauris at sapien sodales iaculis.',
                'Mauris tristique auctor tincidunt. Nam sed elit ut metus suscipit suscipit vel in tortor. Maecenas enim tortor, dapibus non odio ac, volutpat venenatis nulla. Maecenas ac velit faucibus, eleifend magna non, elementum velit. Nullam sed urna at nisl iaculis sodales. Aenean porttitor purus purus, et ullamcorper dolor pretium sed. Proin tempor rutrum libero. Mauris faucibus, urna interdum laoreet dictum, lorem justo tristique metus, sed lobortis nisl tellus id nisi. Nullam vel lacus et lacus sagittis scelerisque ac non dui. Nulla nec augue urna. Curabitur consectetur turpis urna, non efficitur enim varius id. Vestibulum porta finibus nulla. Aenean enim est, eleifend quis arcu non, suscipit tincidunt diam.',
                'Sed neque velit, ullamcorper non neque eget, semper porttitor justo. Fusce faucibus augue rutrum, scelerisque eros vel, ornare diam. Donec a pulvinar velit. Morbi mattis ornare massa id aliquet. Morbi bibendum aliquet nunc eu consequat. Donec laoreet lectus in augue pulvinar viverra. Nunc id gravida arcu, id ornare massa. Integer interdum quam purus, eget semper purus placerat aliquet. Phasellus leo ex, semper sed urna a, maximus commodo lacus. Sed et semper nulla. Pellentesque sed tempor tellus. Etiam facilisis nunc at tellus commodo, id ullamcorper purus interdum. Morbi lectus enim, venenatis id metus ut, commodo pulvinar metus.',
                'Cras sit amet nisl non libero pellentesque maximus. Sed sed lacus quam. Maecenas ultricies dui nulla, sed tempor magna viverra at. Morbi a risus egestas, congue mi eu, vestibulum sem. Vestibulum viverra elit libero, eu faucibus lectus hendrerit ac. Praesent auctor ullamcorper massa, sed aliquam metus fermentum non. Morbi lacinia finibus lorem quis suscipit. Aliquam erat volutpat. Morbi tincidunt nec nunc at consequat. Nulla porta et tellus id ornare.',
            ];
            shuffle(el);
            map.set(el, el);
        }
        assert.ok(map.size > 90);
    });

    it('Should shuffle an array of mixed values in a unique way (benchmark 100 shuffles with a 10 number array)', () => {
        const map = new Map();
        for (let i = 0; i < 100; i++) {
            const el = [
                {a: 1, b: 2, c: 3, d: 4},
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie nisi interdum dui facilisis vestibulum. Cras et velit sodales, consectetur sem vitae, imperdiet tellus. Vivamus vulputate aliquam nunc non faucibus. Nunc eget enim sollicitudin, semper magna et, congue odio. Nullam sagittis condimentum sollicitudin. Vestibulum venenatis ullamcorper ligula, eu dapibus arcu aliquet a. Fusce eleifend non nulla vitae tempus. Integer varius libero vitae tincidunt volutpat. Praesent vitae velit mollis, tincidunt magna in, maximus ligula. Phasellus feugiat leo dolor, eget mattis justo condimentum luctus. Sed varius massa eget sagittis ultricies. Pellentesque maximus enim ultricies porta pellentesque. Quisque varius magna magna, quis accumsan odio venenatis in. Sed fringilla dapibus metus. Proin non feugiat metus. Nulla non neque tristique, pulvinar orci in, fermentum lacus.',
                1,
                423437894,
                [{hello: 'there'}],
                new RegExp('abc', 'g'),
                new Date('2022-01-01'),
                true,
                {the: ['an', 'array', 0]},
                [[0, 2, 4], [1, 2, 3]],
            ];
            shuffle(el);
            map.set(el, el);
        }
        assert.ok(map.size > 90);
    });
});
