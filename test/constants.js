'use strict';

export function fnNumericValues () {
    return [
        1,
        0.000001,
        8e10,
        Math.PI,
        new Number(1.12345),
        new Number(Number.EPSILON),
    ];
}

export function fnIntegerValues () {
    return [
        -1,
        100,
        -50,
        99999,
        20,
    ];
}

export function fnBooleanValues () {
    return [
        true,
        false,
        Boolean(true),
        Boolean(false),
        Boolean('foo'),
        new Boolean(false),
    ];
}

export function fnStringValues () {
    return [
        'foo',
        new String('bar'),
    ];
}

export function fnRegexValues () {
    return [
        /abcdefg/i,
        new RegExp('\\w+'),
    ];
}

export function fnObjectValues () {
    return [
        {bar:'foo'},
        new Object(),
        Object.create(null),
        Object.create([]),
    ];
}

export function fnDateValues () {
    return [
        new Date(),
    ];
}

export function fnArrayValues () {
    return [
        [0, 1, 2],
        new Array(1, 2, 3),
        new Array(5),
    ];
}

export function fnFunctionValues () {
    function testFunction () {}

    const testArrowFunction = () => {};

    return [
        testFunction,
        testArrowFunction,
    ];
}

export function fnNullables () {
    return [
        NaN,
        undefined,
        null,
    ];
}
