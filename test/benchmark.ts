/* eslint-disable max-len,max-lines,no-console */

import * as fs from 'node:fs';

import dedupe                   from '../dist/array/dedupe';
import isArray                  from '../dist/array/is';
import isNotEmptyArray          from '../dist/array/isNotEmpty';
import join                     from '../dist/array/join';
import mapFn                    from '../dist/array/mapFn';
import mapKey                   from '../dist/array/mapKey';
import mapPrimitive             from '../dist/array/mapPrimitive';
import groupBy                  from '../dist/array/groupBy';
import shuffle                  from '../dist/array/shuffle';
import split                    from '../dist/array/split';
import sort                     from '../dist/array/sort';
import isBoolean                from '../dist/boolean/is';
import addUTC                   from '../dist/date/addUTC';
import diff                     from '../dist/date/diff';
import endOfUTC                 from '../dist/date/endOfUTC';
import format                   from '../dist/date/format';
import isDate                   from '../dist/date/is';
import isDateFormat             from '../dist/date/isFormat';
import isFormData               from '../dist/formdata/is';
import nowUnix                  from '../dist/date/nowUnix';
import nowUnixMs                from '../dist/date/nowUnixMs';
import setTimeUTC               from '../dist/date/setTimeUTC';
import startOfUTC               from '../dist/date/startOfUTC';
import toUnix                   from '../dist/date/toUnix';
import toUTC                    from '../dist/date/toUTC';
import deepFreeze               from '../dist/deep/freeze';
import deepGet                  from '../dist/deep/get';
import deepSeal                 from '../dist/deep/seal';
import deepSet                  from '../dist/deep/set';
import isFunction               from '../dist/function/is';
import isAsyncFunction          from '../dist/function/isAsync';
import fnv1A                    from '../dist/hash/fnv1A';
import guid                     from '../dist/hash/guid';
import isNumber                 from '../dist/number/is';
import isNumberAbove            from '../dist/number/isAbove';
import isNumberAboveOrEqual     from '../dist/number/isAboveOrEqual';
import isNumberBelow            from '../dist/number/isBelow';
import isNumberBelowOrEqual     from '../dist/number/isBelowOrEqual';
import isNumberBetween          from '../dist/number/isBetween';
import isInteger                from '../dist/number/isInteger';
import isIntegerAbove           from '../dist/number/isIntegerAbove';
import isIntegerAboveOrEqual    from '../dist/number/isIntegerAboveOrEqual';
import isIntegerBelow           from '../dist/number/isIntegerBelow';
import isIntegerBelowOrEqual    from '../dist/number/isIntegerBelowOrEqual';
import isIntegerBetween         from '../dist/number/isIntegerBetween';
import isNumericalNaN           from '../dist/number/isNumericalNaN';
import randomBetween            from '../dist/number/randomBetween';
import randomIntBetween         from '../dist/number/randomIntBetween';
import round                    from '../dist/number/round';
import toPercentage             from '../dist/number/toPercentage';
import merge                    from '../dist/object/merge';
import pick                     from '../dist/object/pick';
import isObject                 from '../dist/object/is';
import isNotEmptyObject         from '../dist/object/isNotEmpty';
import isRegExp                 from '../dist/regexp/is';
import sanitize                 from '../dist/regexp/sanitize';
import humanizeBytes            from '../dist/string/humanizeBytes';
import humanizeNumber           from '../dist/string/humanizeNumber';
import isString                 from '../dist/string/is';
import isStringBetween          from '../dist/string/isBetween';
import isNotEmptyString         from '../dist/string/isNotEmpty';
import shorten                  from '../dist/string/shorten';
import equal                    from '../dist/equal';
import {RANDOM_OBJECT}          from './benchmarkObject';

const ROW_TEST_WIDTH    = 50;
const ROW_OPS_WIDTH     = 15;
const EXPORT_COLLECTOR  = [];

function separator () {
    console.info(''.padEnd(ROW_TEST_WIDTH + ROW_OPS_WIDTH, '-'));
}

function bench (el, iterations) {
    let runtime = performance.now();
    for (let i = 0; i < iterations; i++) el.fn();
    runtime = performance.now() - runtime;
    const ops =  Math.floor(iterations * (1000/runtime));
    EXPORT_COLLECTOR.push({lbl: el.lbl, ops});
    console.info([el.lbl.padEnd(ROW_TEST_WIDTH, ' '), `${ops}`.padEnd(ROW_OPS_WIDTH, ' ')].join('| '));
}

/* Header */
console.info(`${'Test'.padEnd(ROW_TEST_WIDTH, ' ')}| ${'ops/sec'.padEnd(ROW_OPS_WIDTH, ' ')}`);
separator();

const GROUP_EXAMPLE_10 = [
    {role: 'user', name: 'Peter'},
    {role: 'owner', name: 'Jake'},
    {name: 'Jonas'},
    {role: 'user', name: 'Sarah'},
    {role: 'user', name: 'Bob'},
    {name: 'Billy'},
    {role: 'admin', name: 'Bart'},
    {role: 'god', name: 'Jason'},
    {role: 'admin', name: 'Bryan'},
    {role: 'god', name: 'Felicia'},
];
const GROUP_EXAMPLE_50 = [...GROUP_EXAMPLE_10, ...GROUP_EXAMPLE_10, ...GROUP_EXAMPLE_10, ...GROUP_EXAMPLE_10, ...GROUP_EXAMPLE_10];
const DATE_EXAMPLE = new Date('2022-10-05T13:12:11+02:00');
const DATE_EXAMPLE_2 = new Date('2032-10-05T11:12:11.000Z');

/* Run benchmarks */
for (const el of [
    /* Array - dedupe */
    {
        lbl: 'array/dedupe: numeric - 10 elements',
        fn: () => dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3]),
    },
    {
        lbl: 'array/dedupe: numeric - 20 elements',
        fn: () => dedupe([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 0, 1, 1, 2, 99, 100, 99, 2, 3, 3]),
    },
    {
        lbl: 'array/dedupe: string - 10 elements',
        fn: () => dedupe(['a', 'b', 'b', 'c', 'd', 'e', 'd', 'c', 'b', 'b']),
    },
    {
        lbl: 'array/dedupe: string - 20 elements',
        fn: () => dedupe(['a', 'b', 'b', 'c', 'd', 'e', 'd', 'c', 'b', 'b', 'a', 'b', 'b', 'c', 'd', 'e', 'd', 'c', 'b', 'b']),
    },
    /* Array - is */
    {
        lbl: 'array/is',
        fn: () => isArray([0, 1, 2]),
    },
    /* Array - isNotEmpty */
    {
        lbl: 'array/isNotEmpty',
        fn: () => isNotEmptyArray([0, 1, 2]),
    },
    /* Array - join */
    {
        lbl: 'array/join - valround 1',
        fn: () => join(['   valkyrie ', 569.45, '   studios  '], {delim: '@', valround: 1}),
    },
    {
        lbl: 'array/join - valtrim: false,valround 1',
        fn: () => join(['   valkyrie ', 569.45, '   studios  '], {delim: '@', valround: 1, valtrim: false}),
    },
    /* Array - mapFn */
    {
        lbl: 'array/mapFn',
        fn: () => mapFn([
            {uid: 12, name: 'Peter'},
            {uid: 14, name: 'Jake'},
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            null,
            undefined,
            new Date(),
            {uid: 87, name: 'Josh'},
        ], val => val.uid),
    },
    /* Array - mapKey */
    {
        lbl: 'array/mapKey',
        fn: () => mapKey([
            {uid: 12, name: 'Peter'},
            {uid: 14, name: 'Jake'},
            {uid: 15, name: 'Jonas'},
            [{hi: 'there'}],
            null,
            undefined,
            new Date(),
            {uid: 87, name: 'Josh'},
        ], 'uid'),
    },
    /* Array - mapPrimitive */
    {
        lbl: 'array/mapPrimitive - numeric - 10 elements',
        fn: () => mapPrimitive([0, 1, 1, 2, 99, 100, 99, 2, 3, 3]),
    },
    {
        lbl: 'array/mapPrimitive - numeric - 20 elements',
        fn: () => mapPrimitive([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 0, 1, 1, 2, 99, 100, 99, 2, 3, 3]),
    },
    {
        lbl: 'array/mapPrimitive - string - 10 elements',
        fn: () => mapPrimitive(['a', 'b', 'b', 'c', 'd', 'e', 'd', 'c', 'b', 'b']),
    },
    {
        lbl: 'array/mapPrimitive - string - 20 elements',
        fn: () => mapPrimitive(['a', 'b', 'b', 'c', 'd', 'e', 'd', 'c', 'b', 'b', 'a', 'b', 'b', 'c', 'd', 'e', 'd', 'c', 'b', 'b']),
    },
    /* Array - groupBy */
    {
        lbl: 'array/groupBy(key) - 10 elements',
        fn: () => groupBy(GROUP_EXAMPLE_10, 'role'),
    },
    {
        lbl: 'array/groupBy(key) - 50 elements',
        fn: () => groupBy(GROUP_EXAMPLE_50, 'role'),
    },
    {
        lbl: 'array/groupBy(fn) - 10 elements',
        fn: () => groupBy(GROUP_EXAMPLE_10, val => val.role || 'other'),
    },
    {
        lbl: 'array/groupBy(fn) - 50 elements',
        fn: () => groupBy(GROUP_EXAMPLE_50, val => val.role || 'other'),
    },
    /* Array - shuffle */
    {
        lbl: 'array/shuffle - numeric - 10 elements',
        fn: () => shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    },
    {
        lbl: 'array/shuffle - numeric - 20 elements',
        fn: () => shuffle([0, 1, 1, 2, 99, 100, 99, 2, 3, 3, 0, 1, 1, 2, 99, 100, 99, 2, 3, 3]),
    },
    {
        lbl: 'array/shuffle - string - 10 elements',
        fn: () => shuffle([
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
        ]),
    },
    {
        lbl: 'array/shuffle - string - 20 elements',
        fn: () => shuffle([
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
        ]),
    },
    {
        lbl: 'array/shuffle - mixed - 10 elements',
        fn: () => shuffle([
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
        ]),
    },
    {
        lbl: 'array/shuffle - mixed - 20 elements',
        fn: () => shuffle([
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
        ]),
    },
    /* Array - split */
    {
        lbl: 'array/split',
        fn: () => split([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 2),
    },
    {
        lbl: 'array/split - 20 elements',
        fn: () => split([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 2, {filter_fn: isNotEmptyObject}),
    },
    /* Array - sort */
    {
        lbl: 'array/sort - key string - ascending',
        fn: () => sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 'test', 'asc'),
    },
    {
        lbl: 'array/sort - key string - descending',
        fn: () => sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], 'test', 'desc'),
    },
    {
        lbl: 'array/sort - function - ascending',
        fn: () => sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], val => val.test.toLowerCase(), 'asc'),
    },
    {
        lbl: 'array/sort - function - descending',
        fn: () => sort([
            {test: 'Peter'},
            {test: 'Jack'},
            {test: 'Pony'},
            {test: 'John'},
            {test: 'Joe'},
            {test: 'Bob'},
            {test: 'Alice'},
        ], val => val.test.toLowerCase(), 'desc'),
    },
    /* Boolean - is */
    {
        lbl: 'boolean/is',
        fn: () => isBoolean(true),
    },
    /* Date - addUTC */
    {
        lbl: 'date/addUTC: milliseconds',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'milliseconds'),
    },
    {
        lbl: 'date/addUTC: seconds',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'seconds'),
    },
    {
        lbl: 'date/addUTC: minutes',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'minutes'),
    },
    {
        lbl: 'date/addUTC: hours',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'hours'),
    },
    {
        lbl: 'date/addUTC: days',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'days'),
    },
    {
        lbl: 'date/addUTC: months',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'months'),
    },
    {
        lbl: 'date/addUTC: years',
        fn: () => addUTC(DATE_EXAMPLE, -38970000 * 60, 'years'),
    },
    /* Date - diff */
    {
        lbl: 'date/diff: milliseconds',
        fn: () => diff(DATE_EXAMPLE_2, DATE_EXAMPLE, 'milliseconds'),
    },
    {
        lbl: 'date/diff: seconds',
        fn: () => diff(DATE_EXAMPLE_2, DATE_EXAMPLE, 'seconds'),
    },
    {
        lbl: 'date/diff: minutes',
        fn: () => diff(DATE_EXAMPLE_2, DATE_EXAMPLE, 'minutes'),
    },
    {
        lbl: 'date/diff: hours',
        fn: () => diff(DATE_EXAMPLE_2, DATE_EXAMPLE, 'hours'),
    },
    {
        lbl: 'date/diff: days',
        fn: () => diff(DATE_EXAMPLE_2, DATE_EXAMPLE, 'days'),
    },
    {
        lbl: 'date/diff: weeks',
        fn: () => diff(DATE_EXAMPLE_2, DATE_EXAMPLE, 'weeks'),
    },
    /* Date - endOfUTC */
    {
        lbl: 'date/endOfUTC: second',
        fn: () => endOfUTC(DATE_EXAMPLE, 'second'),
    },
    {
        lbl: 'date/endOfUTC: minute',
        fn: () => endOfUTC(DATE_EXAMPLE, 'minute'),
    },
    {
        lbl: 'date/endOfUTC: hour',
        fn: () => endOfUTC(DATE_EXAMPLE, 'hour'),
    },
    {
        lbl: 'date/endOfUTC: day',
        fn: () => endOfUTC(DATE_EXAMPLE, 'day'),
    },
    {
        lbl: 'date/endOfUTC: week',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week'),
    },
    {
        lbl: 'date/endOfUTC: week_sun',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_sun'),
    },
    {
        lbl: 'date/endOfUTC: week_mon',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_mon'),
    },
    {
        lbl: 'date/endOfUTC: week_tue',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_tue'),
    },
    {
        lbl: 'date/endOfUTC: week_wed',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_wed'),
    },
    {
        lbl: 'date/endOfUTC: week_thu',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_thu'),
    },
    {
        lbl: 'date/endOfUTC: week_fri',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_fri'),
    },
    {
        lbl: 'date/endOfUTC: week_sat',
        fn: () => endOfUTC(DATE_EXAMPLE, 'week_sat'),
    },
    {
        lbl: 'date/endOfUTC: month',
        fn: () => endOfUTC(DATE_EXAMPLE, 'month'),
    },
    {
        lbl: 'date/endOfUTC: quarter',
        fn: () => endOfUTC(DATE_EXAMPLE, 'quarter'),
    },
    {
        lbl: 'date/endOfUTC: year',
        fn: () => endOfUTC(DATE_EXAMPLE, 'year'),
    },
    /* Date - format */
    {
        lbl: 'date/format: YYYY-MM-DD',
        fn: () => format(DATE_EXAMPLE, 'YYYY-MM-DD'),
    },
    {
        lbl: 'date/format: YYYY-MM-DD and zone',
        fn: () => format(DATE_EXAMPLE, 'YYYY-MM-DD', 'en', 'EST'),
    },
    {
        lbl: 'date/format: dddd, DD, MMMMM YYYY hh:mm a',
        fn: () => format(DATE_EXAMPLE, 'dddd, DD, MMMMM YYYY hh:mm a', 'fr', 'Australia/Sydney'),
    },
    {
        lbl: 'date/format: [Now:] dddd, DD, MMMMM YYYY hh:mm a',
        fn: () => format(DATE_EXAMPLE, '[Now:] dddd, DD, MMMMM YYYY hh:mm a', 'fr', 'Australia/Sydney'),
    },
    /* Date - is */
    {
        lbl: 'date/is',
        fn: () => isDate(DATE_EXAMPLE),
    },
    /* Date - isFormat - valid */
    {
        lbl: 'date/isFormat - valid YYYY-MM-DD',
        fn: () => isDateFormat('2024-02-09', 'YYYY-MM-DD'),
    },
    {
        lbl: 'date/isFormat - valid YYYY-[Q]Q',
        fn: () => isDateFormat('2024-Q1', 'YYYY-[Q]Q'),
    },
    {
        lbl: 'date/isFormat - valid ISO',
        fn: () => isDateFormat('2024-02-01T12:30:45.123Z', 'ISO'),
    },
    /* Date - isFormat - invalid */
    {
        lbl: 'date/isFormat - invalid YYYY-MM-DD',
        fn: () => isDateFormat('2023-02-29', 'YYYY-MM-DD'),
    },
    {
        lbl: 'date/isFormat - invalid YYYY-[Q]Q',
        fn: () => isDateFormat('2024-Q5', 'YYYY-[Q]Q'),
    },
    {
        lbl: 'date/isFormat - invalid ISO',
        fn: () => isDateFormat('2024-02-31T12:30:45.123Z', 'ISO'),
    },
    /* Date - nowUnix */
    {
        lbl: 'date/nowUnix',
        fn: () => nowUnix(),
    },
    /* Date - nowUnixMs */
    {
        lbl: 'date/nowUnixMs',
        fn: () => nowUnixMs(),
    },
    /* Date - setTimeUTC */
    {
        lbl: 'date/setTimeUTC: combined',
        fn: () => setTimeUTC(DATE_EXAMPLE, {hour: 12, minute: 42, second: 42, millisecond: 42}),
    },
    {
        lbl: 'date/setTimeUTC: millisecond',
        fn: () => setTimeUTC(DATE_EXAMPLE, {millisecond: 42}),
    },
    {
        lbl: 'date/setTimeUTC: second',
        fn: () => setTimeUTC(DATE_EXAMPLE, {second: 42}),
    },
    {
        lbl: 'date/setTimeUTC: minute',
        fn: () => setTimeUTC(DATE_EXAMPLE, {minute: 42}),
    },
    {
        lbl: 'date/setTimeUTC: hour',
        fn: () => setTimeUTC(DATE_EXAMPLE, {hour: 12}),
    },
    /* Date - startOfUTC */
    {
        lbl: 'date/startOfUTC: second',
        fn: () => startOfUTC(DATE_EXAMPLE, 'second'),
    },
    {
        lbl: 'date/startOfUTC: minute',
        fn: () => startOfUTC(DATE_EXAMPLE, 'minute'),
    },
    {
        lbl: 'date/startOfUTC: hour',
        fn: () => startOfUTC(DATE_EXAMPLE, 'hour'),
    },
    {
        lbl: 'date/startOfUTC: day',
        fn: () => startOfUTC(DATE_EXAMPLE, 'day'),
    },
    {
        lbl: 'date/startOfUTC: week',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week'),
    },
    {
        lbl: 'date/startOfUTC: week_sun',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_sun'),
    },
    {
        lbl: 'date/startOfUTC: week_mon',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_mon'),
    },
    {
        lbl: 'date/startOfUTC: week_tue',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_tue'),
    },
    {
        lbl: 'date/startOfUTC: week_wed',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_wed'),
    },
    {
        lbl: 'date/startOfUTC: week_thu',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_thu'),
    },
    {
        lbl: 'date/startOfUTC: week_fri',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_fri'),
    },
    {
        lbl: 'date/startOfUTC: week_sat',
        fn: () => startOfUTC(DATE_EXAMPLE, 'week_sat'),
    },
    {
        lbl: 'date/startOfUTC: month',
        fn: () => startOfUTC(DATE_EXAMPLE, 'month'),
    },
    {
        lbl: 'date/startOfUTC: quarter',
        fn: () => startOfUTC(DATE_EXAMPLE, 'quarter'),
    },
    {
        lbl: 'date/startOfUTC: year',
        fn: () => startOfUTC(DATE_EXAMPLE, 'year'),
    },
    /* Date - toUnix */
    {
        lbl: 'date/toUnix',
        fn: () => toUnix(DATE_EXAMPLE),
    },
    /* Date - toUTC */
    {
        lbl: 'date/toUTC',
        fn: () => toUTC(DATE_EXAMPLE),
    },
    /* Deep - freeze */
    {
        lbl: 'deep/freeze - small object',
        fn: () => deepFreeze({bla: true, a: {hello: true}}),
    },
    {
        lbl: 'deep/freeze - complex object',
        fn: () => deepFreeze({
            bla: true,
            a: {
                hello: {
                    b: {
                        where: true,
                    },
                    c: {
                        nope: 'not here',
                    },
                },
            },
            b: {
                cool: {
                    this: {
                        keeps: {
                            going: true,
                        },
                    },
                },
            },
        }),
    },
    /* Deep - get */
    {
        lbl: 'deep/get - 1 level',
        fn: () => deepGet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g'),
    },
    {
        lbl: 'deep/get - 2 levels',
        fn: () => deepGet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a'),
    },
    {
        lbl: 'deep/get - 3 levels',
        fn: () => deepGet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.b'),
    },
    {
        lbl: 'deep/get - 4 levels',
        fn: () => deepGet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.b.c'),
    },
    {
        lbl: 'deep/get - 5 levels',
        fn: () => deepGet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.b.c.d'),
    },
    /* Deep - seal */
    {
        lbl: 'deep/seal - small object',
        fn: () => deepSeal({bla: true, a: {hello: true}}),
    },
    {
        lbl: 'deep/seal - complex object',
        fn: () => deepSeal({
            bla: true,
            a: {
                hello: {
                    b: {
                        where: true,
                    },
                    c: {
                        nope: 'not here',
                    },
                },
            },
            b: {
                cool: {
                    this: {
                        keeps: {
                            going: true,
                        },
                    },
                },
            },
        }),
    },
    /* Deep - set */
    {
        lbl: 'deep/set - 1 level',
        fn: () => deepSet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.another', {more: 'treasure'}),
    },
    {
        lbl: 'deep/set - 2 levels',
        fn: () => deepSet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.another', {more: 'treasure'}),
    },
    {
        lbl: 'deep/set - 3 levels',
        fn: () => deepSet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.b.another', {more: 'treasure'}),
    },
    {
        lbl: 'deep/set - 4 levels',
        fn: () => deepSet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.b.c.another', {more: 'treasure'}),
    },
    {
        lbl: 'deep/set - 5 levels',
        fn: () => deepSet({g: {a: {b: {c: {d: 'treasure'}}}}}, 'g.a.b.c.d.another', {more: 'treasure'}),
    },
    /* FormData - is */
    {
        lbl: 'formdata/is',
        fn: () => isFormData({hi: 'there'}),
    },
    /* Function - is */
    {
        lbl: 'function/is',
        fn: () => isFunction(() => 'hello'),
    },
    /* Function - isAsync */
    {
        lbl: 'function/isAsync',
        fn: () => isAsyncFunction(async () => 'hello'),
    },
    /* Hash - fnv1A */
    {
        lbl: 'hash/fnv1A - 10 chars',
        fn: () => fnv1A('0123456789'),
    },
    {
        lbl: 'hash/fnv1A - 20 chars',
        fn: () => fnv1A('01234567890123456789'),
    },
    /* Hash - guid */
    {
        lbl: 'hash/guid',
        fn: () => guid(),
    },
    /* Number - is */
    {
        lbl: 'number/is',
        fn: () => isNumber(42),
    },
    /* Number - isAbove */
    {
        lbl: 'number/isAbove',
        fn: () => isNumberAbove(42, 10),
    },
    /* Number - isAboveOrEqual */
    {
        lbl: 'number/isAboveOrEqual',
        fn: () => isNumberAboveOrEqual(42, 10),
    },
    /* Number - isBelow */
    {
        lbl: 'number/isBelow',
        fn: () => isNumberBelow(42, 10),
    },
    /* Number - isBelowOrEqual */
    {
        lbl: 'number/isBelowOrEqual',
        fn: () => isNumberBelowOrEqual(42, 10),
    },
    /* Number - isBetween */
    {
        lbl: 'number/isBetween',
        fn: () => isNumberBetween(42, 10, 100),
    },
    /* Number - isInteger */
    {
        lbl: 'number/isInteger',
        fn: () => isInteger(42),
    },
    /* Number - isIntegerAbove */
    {
        lbl: 'number/isIntegerAbove',
        fn: () => isIntegerAbove(42, 10),
    },
    /* Number - isIntegerAboveOrEqual */
    {
        lbl: 'number/isIntegerAboveOrEqual',
        fn: () => isIntegerAboveOrEqual(42, 10),
    },
    /* Number - isIntegerBelow */
    {
        lbl: 'number/isIntegerBelow',
        fn: () => isIntegerBelow(42, 10),
    },
    /* Number - isIntegerBelowOrEqual */
    {
        lbl: 'number/isIntegerBelowOrEqual',
        fn: () => isIntegerBelowOrEqual(42, 10),
    },
    /* Number - isIntegerBetween */
    {
        lbl: 'number/isIntegerBetween',
        fn: () => isIntegerBetween(42, 10, 100),
    },
    /* Number - isNumericalNaN */
    {
        lbl: 'number/isNumericalNaN',
        fn: () => isNumericalNaN(42),
    },
    /* Number - randomBetween */
    {
        lbl: 'number/randomBetween',
        fn: () => randomBetween(0, 1000),
    },
    /* Number - randomIntBetween */
    {
        lbl: 'number/randomIntBetween',
        fn: () => randomIntBetween(0, 1000),
    },
    /* Number - round */
    {
        lbl: 'number/round - 0 precision',
        fn: () => round(Math.PI),
    },
    {
        lbl: 'number/round - 1 precision',
        fn: () => round(Math.PI, 1),
    },
    {
        lbl: 'number/round - 2 precision',
        fn: () => round(Math.PI, 2),
    },
    {
        lbl: 'number/round - 3 precision',
        fn: () => round(Math.PI, 3),
    },
    {
        lbl: 'number/round - 4 precision',
        fn: () => round(Math.PI, 4),
    },
    {
        lbl: 'number/round - 5 precision',
        fn: () => round(Math.PI, 5),
    },
    /* Number - toPercentage */
    {
        lbl: 'number/toPercentage - 0 precision',
        fn: () => toPercentage(39, 0, -100, 100),
    },
    {
        lbl: 'number/toPercentage - 1 precision',
        fn: () => toPercentage(39, 1, -100, 100),
    },
    {
        lbl: 'number/toPercentage - 2 precision',
        fn: () => toPercentage(39, 2, -100, 100),
    },
    {
        lbl: 'number/toPercentage - 3 precision',
        fn: () => toPercentage(39, 3, -100, 100),
    },
    {
        lbl: 'number/toPercentage - 4 precision',
        fn: () => toPercentage(39, 4, -100, 100),
    },
    {
        lbl: 'number/toPercentage - 5 precision',
        fn: () => toPercentage(39, 5, -100, 100),
    },
    /* Object - is */
    {
        lbl: 'object/is',
        fn: () => isObject(RANDOM_OBJECT),
    },
    /* Object - isNotEmpty */
    {
        lbl: 'object/isNotEmpty',
        fn: () => isNotEmptyObject(RANDOM_OBJECT),
    },
    /* Object - merge */
    {
        lbl: 'object/merge left',
        fn: () => merge({a: true}, {b: true}),
    },
    /* Object - merge union */
    {
        lbl: 'object/merge union',
        fn: () => merge({a: true}, {b: true}, {union: true}),
    },
    /* Object - merge multiple */
    {
        lbl: 'object/merge multi left',
        fn: () => merge({a: true}, [{b: true}, {C: 1, d: 2}, {f: [0, 1, 2]}]),
    },
    /* Object - merge union */
    {
        lbl: 'object/merge multi union',
        fn: () => merge({a: true}, [{b: true}, {C: 1, d: 2}, {f: [0, 1, 2]}], {union: true}),
    },
    /* Object - pick */
    {
        lbl: 'object/pick',
        fn: () => pick({a: true, b: true}, ['a', 'b']),
    },
    /* RegExp - is */
    {
        lbl: 'regexp/is',
        fn: () => isRegExp(/abc/i),
    },
    /* RegExp - sanitize */
    {
        lbl: 'regexp/sanitize',
        fn: () => sanitize(' contact@valkyriestudios.be '),
    },
    /* String - humanizeBytes */
    {
        lbl: 'string/humanizeBytes - short w/ 0 precision',
        fn: () => humanizeBytes(58432, {precision: 0}),
    },
    {
        lbl: 'string/humanizeBytes - short w/ 1 precision',
        fn: () => humanizeBytes(58432, {precision: 1}),
    },
    {
        lbl: 'string/humanizeBytes - short w/ 2 precision',
        fn: () => humanizeBytes(58432, {precision: 2}),
    },
    {
        lbl: 'string/humanizeBytes - short w/ 3 precision',
        fn: () => humanizeBytes(58432, {precision: 3}),
    },
    {
        lbl: 'string/humanizeBytes - short w/ 4 precision',
        fn: () => humanizeBytes(58432, {precision: 4}),
    },
    {
        lbl: 'string/humanizeBytes - long w/ 0 precision',
        fn: () => humanizeBytes(4328904892322, {precision: 0}),
    },
    {
        lbl: 'string/humanizeBytes - long w/ 1 precision',
        fn: () => humanizeBytes(4328904892322, {precision: 1}),
    },
    {
        lbl: 'string/humanizeBytes - long w/ 2 precision',
        fn: () => humanizeBytes(4328904892322, {precision: 2}),
    },
    {
        lbl: 'string/humanizeBytes - long w/ 3 precision',
        fn: () => humanizeBytes(4328904892322, {precision: 3}),
    },
    {
        lbl: 'string/humanizeBytes - long w/ 4 precision',
        fn: () => humanizeBytes(4328904892322, {precision: 4}),
    },
    /* String - humanizeNumber */
    {
        lbl: 'string/humanizeNumber - short w/ 0 precision',
        fn: () => humanizeNumber(58432, {precision: 0}),
    },
    {
        lbl: 'string/humanizeNumber - short w/ 1 precision',
        fn: () => humanizeNumber(58432, {precision: 1}),
    },
    {
        lbl: 'string/humanizeNumber - short w/ 2 precision',
        fn: () => humanizeNumber(58432, {precision: 2}),
    },
    {
        lbl: 'string/humanizeNumber - short w/ 3 precision',
        fn: () => humanizeNumber(58432, {precision: 3}),
    },
    {
        lbl: 'string/humanizeNumber - short w/ 4 precision',
        fn: () => humanizeNumber(58432, {precision: 4}),
    },
    {
        lbl: 'string/humanizeNumber - long w/ 0 precision',
        fn: () => humanizeNumber(4328904892322, {precision: 0}),
    },
    {
        lbl: 'string/humanizeNumber - long w/ 1 precision',
        fn: () => humanizeNumber(4328904892322, {precision: 1}),
    },
    {
        lbl: 'string/humanizeNumber - long w/ 2 precision',
        fn: () => humanizeNumber(4328904892322, {precision: 2}),
    },
    {
        lbl: 'string/humanizeNumber - long w/ 3 precision',
        fn: () => humanizeNumber(4328904892322, {precision: 3}),
    },
    {
        lbl: 'string/humanizeNumber - long w/ 4 precision',
        fn: () => humanizeNumber(4328904892322, {precision: 4}),
    },
    /* String - is */
    {
        lbl: 'string/is',
        fn: () => isString('foobar'),
    },
    /* String - isBetween */
    {
        lbl: 'string/isBetween',
        fn: () => isStringBetween('foobar', 1, 10),
    },
    /* String - isNotEmpty */
    {
        lbl: 'string/isNotEmpty',
        fn: () => isNotEmptyString('foobar'),
    },
    /* String - shorten */
    {
        lbl: 'string/shorten - 10 chars w/ 3 char',
        fn: () => shorten('0123456789', 3, '...'),
    },
    {
        lbl: 'string/shorten - 10 chars w/ 6 char',
        fn: () => shorten('0123456789', 6, '...'),
    },
    {
        lbl: 'string/shorten - 20 chars w/ 3 char',
        fn: () => shorten('01234567890123456789', 3, '...'),
    },
    {
        lbl: 'string/shorten - 20 chars w/ 6 char',
        fn: () => shorten('01234567890123456789', 6, '...'),
    },
    /* String - shorten - truncate_words false */
    {
        lbl: 'string/shorten notrunc - 10 chars w/ 3 char',
        fn: () => shorten('012 345 678 9', 3, '...', false),
    },
    {
        lbl: 'string/shorten notrunc - 10 chars w/ 6 char',
        fn: () => shorten('012 345 678 9', 6, '...', false),
    },
    {
        lbl: 'string/shorten notrunc - 20 chars w/ 3 char',
        fn: () => shorten('012 345 678 901 234 56789', 3, '...', false),
    },
    {
        lbl: 'string/shorten notrunc - 20 chars w/ 6 char',
        fn: () => shorten('012 345 678 901 234 56789', 6, '...', false),
    },
    /* Equal */
    {
        lbl: 'equal - numbers - unequal',
        fn: () => equal(5, 'foo'),
    },
    {
        lbl: 'equal - numbers - unequal same type',
        fn: () => equal(5, 10),
    },
    {
        lbl: 'equal - numbers - equal',
        fn: () => equal(5, 5),
    },
    {
        lbl: 'equal - boolean - unequal',
        fn: () => equal(false, 'foo'),
    },
    {
        lbl: 'equal - boolean - unequal same type',
        fn: () => equal(false, true),
    },
    {
        lbl: 'equal - boolean - equal',
        fn: () => equal(true, true),
    },
    {
        lbl: 'equal - string - unequal',
        fn: () => equal(5, 'foo'),
    },
    {
        lbl: 'equal - string - unequal same type',
        fn: () => equal('foo', 'bar'),
    },
    {
        lbl: 'equal - string - equal',
        fn: () => equal('bar', 'bar'),
    },
    {
        lbl: 'equal - dates - unequal',
        fn: () => equal(new Date('2022-01-01'), 'foo'),
    },
    {
        lbl: 'equal - dates - unequal same type',
        fn: () => equal(new Date('2022-01-01'), new Date('1989-08-01')),
    },
    {
        lbl: 'equal - dates - equal',
        fn: () => equal(new Date('1989-08-01'), new Date('1989-08-01')),
    },
    {
        lbl: 'equal - arrays - unequal',
        fn: () => equal([1, 2, 3], 'foo'),
    },
    {
        lbl: 'equal - arrays - unequal same type',
        fn: () => equal([1, 2, 3], [3, 2, 1]),
    },
    {
        lbl: 'equal - arrays - equal',
        fn: () => equal([1, 2, 3], [1, 2, 3]),
    },
    {
        lbl: 'equal - objects - unequal',
        fn: () => equal({a: true}, 'foo'),
    },
    {
        lbl: 'equal - objects - unequal same type',
        fn: () => equal({a: true}, {a: false}),
    },
    {
        lbl: 'equal - objects - equal',
        fn: () => equal({a: true}, {a: true}),
    },
]) bench(el, 500000);

fs.writeFileSync('./test/benchmarks/latest.json', JSON.stringify(EXPORT_COLLECTOR, null, 4), 'utf8');

separator();
