# @valkyriestudios/utils

[![CodeCov](https://codecov.io/gh/ValkyrieStudios/utils/branch/master/graph/badge.svg)](https://codecov.io/gh/ValkyrieStudios/utils)
[![Test](https://github.com/ValkyrieStudios/utils/actions/workflows/test.yml/badge.svg?branch=master)](https://github.com/ValkyrieStudios/utils/actions/workflows/test.yml)
[![Lint](https://github.com/ValkyrieStudios/utils/actions/workflows/lint.yml/badge.svg?branch=master)](https://github.com/ValkyrieStudios/utils/actions/workflows/lint.yml)
[![CodeQL](https://github.com/ValkyrieStudios/utils/actions/workflows/github-code-scanning/codeql/badge.svg?branch=master)](https://github.com/ValkyrieStudios/utils/actions/workflows/github-code-scanning/codeql)
[![npm](https://img.shields.io/npm/v/@valkyriestudios/utils.svg)](https://www.npmjs.com/package/@valkyriestudios/utils)
[![npm](https://img.shields.io/npm/dm/@valkyriestudios/utils.svg)](https://www.npmjs.com/package/@valkyriestudios/utils)

Zero-dependency collection of single-function utilities for common tasks

## Installation
`npm install @valkyriestudios/utils`

## Available Functions

### array
- **isArray(val:any)**
Check if a variable is of type Array
```typescript
isArray({a:1}); // FALSE
isArray([]); // TRUE
```

- **isNotEmptyArray(val:any)**
Check if a variable a non-empty array
```typescript
isNotEmptyArray({a:1}); // FALSE
isNotEmptyArray([]); // FALSE
isNotEmptyArray([0, 1, 2]); // TRUE
```

- **mapKey(val:Record[], key:string, opts:object={})**
Map a non-primitive object array into an object map by key
```typescript
mapKey([
    {uid: 12, name: 'Peter'},
    {uid: 15, name: 'Jonas'},
    {uid: 87, name: 'Josh'},
], 'uid');

output:

{
    12: {uid: 12, name: 'Peter'},
    15: {uid: 15, name: 'Jonas'},
    87: {uid: 87, name: 'Josh'},
}
```

Autofilters anything not meeting the spec:
```typescript
mapKey([
    0,
    {uid: 12, name: 'Peter'},
    false,
    'foobar',
    {uid: 15, name: 'Jonas'},
    [{hi: 'there'}],
    null,
    undefined,
    new Date(),
    {uid: 87, name: 'Josh'},
], 'uid');

output:

{
    12: {uid: 12, name: 'Peter'},
    15: {uid: 15, name: 'Jonas'},
    87: {uid: 87, name: 'Josh'},
}
```

allows merging objects onto existing keys:
```typescript
mapKey([
    0,
    {uid: 12, name: 'Peter'},
    false,
    'foobar',
    {uid: 15, name: 'Jonas', dob: '2022-02-07'},
    [{hi: 'there'}],
    {uid: 15, name: 'Bob'},
    null,
    undefined,
    {name: 'Alana'},
    new Date(),
    {uid: 87, name: 'Josh'},
    {uid: 12, name: 'Farah'},
], 'uid', {merge: true})

output:

{
    12: {uid: 12, name: 'Farah'},
    15: {uid: 15, name: 'Bob', dob: '2022-02-07'},
    87: {uid: 87, name: 'Josh'},
}
```

- **mapFn(val:Record[], key:Function, opts:object={})**
Same behavior as mapKey but instead of a key, a function is passed to generate your own key. Eg:

```typescript
mapFn([
    {uid: 12, name: 'Peter'},
    {uid: 15, name: 'Jonas'},
    {uid: 87, name: 'Josh'},
], el => el.uid)

output:

{
    12: {uid: 12, name: 'Peter'},
    15: {uid: 15, name: 'Jonas'},
    87: {uid: 87, name: 'Josh'},
}
```

options are the same as the mapKey function

- **mapPrimitive(val:any[], opts:object={valtrim:false,keyround:false,valround:false})**
Map an array of primitives (number/string)
```typescript
mapPrimitive([1,2,3]); // {1: 1, 2: 2, 3: 3}
mapPrimitive(['hello', 'hello', 'foo', 'bar']); // {hello: 'hello', foo: 'foo', bar: 'bar'}
mapPrimitive(['hello', ' hello', 'foo', '  foo'], {valtrim: true}); // {hello: 'hello', foo: 'foo'}
```

- **groupBy(val:Record[], handler:Function|string)**
Return a grouped object from an array. This function **will automatically filter out any non/empty objects**.

Example usage when using a **function** as the handler
```typescript
/* The output of the function will be what the key is on the map  */
const group = groupBy([
    {tally: 20, name: 'Peter'},
    {tally: 40, name: 'Jake'},
    {tally: 5, name: 'Bob'},
], el => el.tally > 15);

/* Expected output: */
{
    false: [{tally: 5, name: 'Bob'}],
    true: [{tally: 20, name: 'Peter'}, {tally: 40, name: 'Jake'}],
}

/* Can also work with a property return  */
const group = groupBy([
    {role: 'user', name: 'Peter'},
    {role: 'user', name: 'Jake'},
    {role: 'guest', name: 'Bob'},
    {name: 'Alice'},
], el => el.role || 'other');

/* Expected output: */
{
    user: [{role: 'user', name: 'Peter'}, {role: 'user', name: 'Jake'}],
    guest: [{role: 'guest', name: 'Bob'}],
    other: [{name: 'Alice'}],
}
```
**Take note**: If the function returns an undefined or empty string the object will be added to a fallback group called '_'


Example usage when using a **string** as the handler to denote a grouping by a certain property name
```typescript
const group = groupBy([
    {role: 'user', name: 'Peter'},
    {role: 'user', name: 'Jake'},
    {role: 'guest', name: 'Bob'},
    {name: 'Alice'},
], 'role');

/* Expected output: */
{
    user: [{role: 'user', name: 'Peter'}, {role: 'user', name: 'Jake'}],
    guest: [{role: 'guest', name: 'Bob'}],
    _: [{name: 'Alice'}],
}
```

**Take note**: any object without the key will be added to a fallback group called '_'


- **dedupe(val:Array, opts?:{filter_fn})**
Remove all duplicates from an array, behind the scenes it uses the fnv 1A hash algorithm to performantly do comparisons.
```typescript
dedupe(['a','a','b','c','c']); // ['a', 'b', 'c']
dedupe(['1',1,'2',2]); // ['1','2']
dedupe([new RegExp(/ab+c/, 'i'), new RegExp(/ab+c/, 'i')]); // [new RegExp(/ab+c/, 'i')]
dedupe([new Date('2012-02-02'), new Date('2012-02-02')]); // [new Date('2012-02-02')]
dedupe(['hello', 'hello', 'world']); // ['hello', 'world']
dedupe(['hello', 'hello', 'world', false, 'world'], {filter_fn: el => isNotEmptyString(el)}); // ['hello', 'world']
```

Take Note: The filtering is applied while deduping, ensuring O(n) performance, as such this is faster than dedupe(arr.filter(...))

- **join(val:Array, opts:object={delim:' ',trim:true,valtrim:true,innertrim:true,valround:false})**
Concatenate the values within an array into a string, behind the scenes this will automatically filter out any value that is not a string or numerical value. For strings it will automatically trim (and remove if empty after trimming) before joining.

```typescript
join(['Valkyrie', 'Studios']); // 'Valkyrie Studios'
join([5.1, '  years ', 'ago'], {valround: 0}); // '5 years ago'
join(['peter   ', '  valkyrie  '], {delim: '@'}); // 'peter@valkyrie'
join([user.first_name, user.last_name]); // 'John' (where user is {first_name: 'John', last_name: false})
join(['  a', 1], {delim: '', valtrim: false, trim: false}); // '  a1'
join(['  hello  world  ', 'this   is    peter   '], {valtrim:true, innertrim: true, delim: ' '}); // 'hello world this is peter'
```

- **shuffle(val:Array)**
Shuffle an array (Fisher-Yates) in O(n), take note this changes the passed value

```typescript
const arr = [1, 2, 3, 4, 5, 6];
shuffle(arr);
// [4, 6, 3, 2, 5, 1]
```

- **sort(val:Array[object], by:string|Function, dir:Enum(asc,desc), options:Object)**
Sort an array of objects, uses an implementation of [Tony Hoare's quicksort](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/tony-hoare/quicksort.html)

```typescript
const out = sort([
    {test: 'Peter'},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'John'},
    {test: 'Joe'},
    {test: 'Bob'},
    {test: 'Alice'},
], 'test', 'desc');
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'John'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

```typescript
const out = sort([
    {test: 'Peter'},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'John'},
    {test: 'Joe'},
    {test: 'Bob'},
    {test: 'Alice'},
], 'test', 'asc');
// [{test: 'Alice'}, {test: 'Bob'}, {test: 'Jack'}, {test: 'Joe'}, {test: 'John'}, {test: 'Peter'}, {test: 'Pony'}]
```

allows passing a function to determine the key to sort by

```typescript
const out = sort([
    {test: 'Peter'},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'JOHn'},
    {test: 'Joe'},
    {test: 'Bob'},
    {test: 'Alice'},
], el => el.test.toLowerCase(), 'desc');
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

auto-cleans input to only contains non-empty objects

```typescript
const out = sort([
    {test: 'Peter'},
    {},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: 'JOHn'},
    false,
    {test: 'Joe'},
    {test: 'Bob'},
    undefined,
    {test: 'Alice'},
], el => el.test.toLowerCase(), 'desc');
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

allows passing custom filter function to clean input
Take note: Sort will still verify that the object is not an empty object, even when passing a custom filter function.

```typescript
const out = sort([
    {test: 'Peter'},
    {},
    {test: 'Jack'},
    {test: 'Pony'},
    {test: false},
    {test: 'JOHn'},
    false,
    {test: 'Joe'},
    {test: undefined},
    {test: 'Bob'},
    undefined,
    {test: 'Alice'},
], el => el.test.toLowerCase(), 'desc', {filter_fn: el => isNotEmptyString(el.test)});
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Joe'}, {test: 'Jack'}, {test: 'Bob'}, {test: 'Alice'}]
```

allows passing custom options to position elements without a proper key (nokey_atend, defaults to true), or hide them (nokey_hide, defaults to false)

```typescript
const arr = [{test: 'Peter'}, {test: undefined}, {test: 'Jack'}, {test: 'Pony'}, {uid: 100}, {test: 'JOHn'}];
const out = sort(arr, el => el.test.toLowerCase(), 'desc', {nokey_atend: false});
// [{test: undefined}, {uid: 100}, {test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Jack'}]

const out = sort(arr, el => el.test.toLowerCase(), 'desc', {nokey_atend: true});
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Jack'}, {test: undefined}, {uid: 100}]

const out = sort(arr, el => el.test.toLowerCase(), 'desc', {nokey_hide: true});
// [{test: 'Pony'}, {test: 'Peter'}, {test: 'JOHn'}, {test: 'Jack'}]
```

- **split(val:any[], size:number, opts?:{filter_fn})**
Splits an array into subarray of provided size with optional filter
```typescript
split([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]
split([1, 2, false, 4, 5], 2, {filter_fn: isInteger}); // [[1,2],[4,5]]
```

Take Note: The filtering is applied while splitting, ensuring O(n) performance, as such this is faster than split(arr.filter(...), ...)

### boolean
- **isBoolean(val:any)**
Check if a variable is of type Boolean
```typescript
isBoolean(null); // FALSE
isBoolean(false); // TRUE
isBoolean(true); // TRUE
```

### caching
- **memoize(fn:Function, resolver:Function=false, memoize_for:number|false)**
memoize the output of a function. An optional resolver function can be passed which allows custom cache key generation.

```typescript
const memoized_function = memoize((a) => {
    return fnv1A(a);
});
```

Take Note: Also supports async functions and cache busting, eg:
```typescript
async function retrieveUser (userId:string) {
    ...
}

/* Async but with no cache busting */
const memoized = memoize(retrieveUser);
await memoized('123456'); /* Original function will be called */
await memoized('123456'); /* Original function will not be called and memoized cache will be returned */

/* Async with cache busting after 5 seconds */
const memoized = memoize(retrieveUser, null, 5000);
await memoized('123456'); /* Original function will be called */
await memoized('123456'); /* Original function will not be called and memoized cache will be returned */

... (some time longer than 5 seconds passes)

await memoized('123456'); /* Original function will be called and re-cached */
```

### date
- **isDate(val:any)**
Check if a variable is of type Date
```typescript
isDate(new Date('December 17, 1995 03:24:00')); // TRUE
isDate('December 17, 1995 03:24:00'); // FALSE
```

- **diff(val_a:Date, val_b:Date, key:string)**
Take two incoming dates and return the difference between them in a certain unit. Possible key options(week,day,hour,minute,second,millisecond).

Note: Does not touch the passed date objects, if no key is passed will default to millisecond
```typescript
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-11-05T13:12:11+06:00"), 'week'); // -4.404761904761905
diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'day'); // 30.83333333333333332
diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:12:11+02:00"), 'hour'); // 740
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'minute'); // -30.9724
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'second'); // -1858.344
diff(new Date("2022-10-05T13:12:11+02:00"), new Date("2022-10-05T17:43:09.344+06:00"), 'millisecond'); // -1858344
diff(new Date("2022-11-05T13:12:11+06:00"), new Date("2022-10-05T13:25:43.898+02:00")); // 2663187102
```
- **format(val:Date, spec:string, locale?:string, zone?:string):string**
Format a date according to a spec/locale and zone

Note: The locale is by default set to 'en-US'

Note: The zone is by default detected as the zone of the client

Available tokens for usage in spec:
| Token     | Description               | Example       |
|:---------|:--------------------------|:---------------|
| `YYYY` | Full Year | 2021 |
| `Q` | Quarters of the year | 1 2 3 4 |
| `MMMM` | Month in full | January February ... November December |
| `MMM` | Month as 3 char | Jan Feb ... Nov Dec |
| `MM` | Month as 2 char | 01 02 .. 11 12 |
| `M` | Month as pure digit | 1 2 .. 11 12 |
| `DD` | Day of month as 2 char | 01 02 .. 30 31 |
| `D` | Day of month as 1 char | 1 2 .. 30 31 |
| `dddd` | Day of week as 3 char | Sun Mon ... Fri Sat |
| `ddd` | Day of week in full | Sunday Monday ... Saturday |
| `HH` | Hours as 2-char | 00 01 .. 22 23 |
| `H` | Hours as pure digit | 0 1 .. 22 23 |
| `hh` | Hours in 12 hour time as 2 char | 01 02 ... 11 12 |
| `h` | Hours in 12 hour time as pure digit | 1 2 ... 11 12 |
| `mm` | Minutes as 2-char | 00 01 .. 58 59 |
| `m` | Minutes as pure digit | 0 1 .. 58 59 |
| `ss` | Seconds as 2-char | 00 01 .. 58 59 |
| `s` | Seconds as pure digit | 0 1 .. 58 59 |
| `SSS` | Milliseconds as 3-digit | 000 001 ... 998 999 |
| `A` | Uppercase AM/PM | AM ... PM |
| `a` | Lowercase AM/PM | am ... pm |
| `l` | Locale-specific short Date | 15/07/2024 |
| `L` | Locale-Specific date | 15 jul 2024 |
| `t` | Locale-specific short time | 10:28 AM |
| `T` | Locale-specific time with seconds | 10:28:30 AM |

```typescript
format(new Date('2023-01-10T14:30:00Z'), '[Today is] dddd, MMMM D, YYYY [at] h:mm A', 'en', 'Europe/Brussels');
//  'Today is Tuesday, January 10, 2023 at 2:30 PM'

format(new Date('2022-07-14T16:40:30Z'), 'dddd, [Year] Q Q M D [à] hh:mm A [string]', 'fr', 'Asia/Singapore');
// 'vendredi, Year 3 3 7 15 à 12:40 AM string'

format(new Date('2022-07-14T16:40:30Z'), 'YYYY-MM-DD', 'fr', 'Asia/Singapore');
// 2022-07-15

format(new Date('2022-07-14T16:40:30Z'), 'YYYY-MM-DD', 'fr', 'Europe/Brussels');
// 2022-07-14
```

- **toUTC(val:Date)**
Takes the passed date object and returns a new date object set for utc

- **toUnix(val:Date)**
Takes the passed date object and returns its unix timestamp in seconds

- **nowUnix()**
Returns the current unix timestamp in seconds

- **nowUnixMs()**
Returns the current unix timestamp in milliseconds

- **setTimeUTC(val:Date, props:{hour?:number;minute?:number;second?:number;millisecond?:number})**
Take the incoming date and return a date where the time portion is set to the values in the provided props

Note: Does not touch the date object passed
```typescript
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5}); // new Date("2023-05-04T05:04:27.432Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30}); // new Date("2023-05-04T05:30:27.432Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30, second: 0}); // new Date("2023-05-04T05:30:00.432Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {hour: 5, minute: 30, second: 0, millisecond: 0}); // new Date("2023-05-04T05:30:00.000Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {minute: 30, second: 0, millisecond: 0}); // new Date("2023-05-04T12:30:00.000Z")
setTimeUTC(new Date("2023-05-04T12:04:27.432Z"), {second: 9, millisecond: 0}); // new Date("2023-05-04T12:04:09.000Z")
```

- **startOfUTC(val:Date, key:string)**
Take the incoming date and return a date set to the start of passed key. Possible key options(year,quarter,month,week,week_sun,week_mon,week_tue,week_wed,week_thu,week_fri,week_sat,day,hour,minute,second).

Note: Does not touch the date object passed
```typescript
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'year'); // new Date("2023-01-01T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'quarter'); // new Date("2023-04-01T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'month'); // new Date("2023-05-01T00:00:00.000Z")
startOfUTC(new Date("2023-05-14T12:04:27+02:00"), 'week'); // new Date("2023-05-08T00:00:00.000Z")
startOfUTC(new Date("2023-02-03T12:04:27+02:00"), 'week'); // new Date("2023-01-30T00:00:00.000Z")
startOfUTC(new Date("2023-01-01T12:04:27+02:00"), 'week'); // new Date("2022-12-26T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun'); // new Date("2023-04-30T00:00:00.000Z")
startOfUTC(new Date("2023-02-03T12:04:27+02:00"), 'week_sun'); // new Date("2023-01-29T00:00:00.000Z")
startOfUTC(new Date("2022-01-01T12:04:27+02:00"), 'week_sun'); // new Date("2021-12-26T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'day'); // new Date("2023-05-04T00:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'hour'); // new Date("2023-05-04T10:00:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'minute'); // new Date("2023-05-04T10:04:00.000Z")
startOfUTC(new Date("2023-05-04T12:04:27.043+02:00"), 'second'); // new Date("2023-05-04T10:04:27.000Z")
```

- **endOfUTC(val:Date, key:string)**
Take the incoming date and return a date set to the end of passed key. Possible key options(year,quarter,month,week,week_sun,week_mon,week_tue,week_wed,week_thu,week_fri,week_sat,day,hour,minute,second).

Note: Does not touch the date object passed
```typescript
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'year'); // new Date("2023-12-31T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'quarter'); // new Date("2023-06-30T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'month'); // new Date("2023-05-31T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week'); // new Date("2023-05-07T23:59:59.999Z")
endOfUTC(new Date("2023-05-13T12:04:27+02:00"), 'week'); // new Date("2023-05-14T23:59:59.999Z")
endOfUTC(new Date("2023-05-14T12:04:27+02:00"), 'week'); // new Date("2023-05-14T23:59:59.999Z")
endOfUTC(new Date("2023-02-27T12:04:27+02:00"), 'week'); // new Date("2023-03-05T23:59:59.999Z")
endOfUTC(new Date("2022-12-29T12:04:27+02:00"), 'week'); // new Date("2023-01-01T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'week_sun'); // new Date("2023-05-06T23:59:59.999Z")
endOfUTC(new Date("2023-05-12T12:04:27+02:00"), 'week_sun'); // new Date("2023-05-13T23:59:59.999Z")
endOfUTC(new Date("2023-05-06T12:04:27+02:00"), 'week_sun'); // new Date("2023-05-06T23:59:59.999Z")
endOfUTC(new Date("2023-03-29T12:04:27+02:00"), 'week_sun'); // new Date("2023-04-01T23:59:59.999Z")
endOfUTC(new Date("2021-12-28T12:04:27+02:00"), 'week_sun'); // new Date("2022-01-01T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'day'); // new Date("2023-05-04T23:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'hour'); // new Date("2023-05-04T10:59:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27+02:00"), 'minute'); // new Date("2023-05-04T10:04:59.999Z")
endOfUTC(new Date("2023-05-04T12:04:27.043+02:00"), 'second'); // new Date("2023-05-04T10:04:27.999Z")
```

- **addUTC(val:Date, amount:integer, key:string)**
Take the incoming date and add a certain amount of the passed key. Possible key options(year,years,month,months,day,days,hour,hours,minute,minutes,second,seconds,millisecond,milliseconds).

Note: Does not touch the date object passed
```typescript
addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'year'); // new Date("2032-10-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'year'); // new Date("2012-10-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 10, 'month'); // new Date("2023-08-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -8970, 'month'); // new Date("1275-04-05T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 200, 'day'); // new Date("2023-04-23T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -400, 'day'); // new Date("2021-08-31T11:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 2200, 'hour'); // new Date("2023-01-05T03:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'hour'); // new Date("2022-10-05T01:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'minute'); // new Date("2022-10-05T12:11:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000, 'minute'); // new Date("2023-05-26T19:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -34, 'minute'); // new Date("2022-10-05T10:38:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -769, 'minute'); // new Date("2022-10-04T22:23:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 59, 'second'); // new Date("2022-10-05T11:13:10.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 2873 * 60, 'second'); // new Date("2022-10-07T11:05:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), 336000 * 60, 'second'); // new Date("2023-05-26T19:12:11.000Z")
addUTC(new Date("2022-10-05T13:12:11+02:00"), -10, 'second'); // new Date("2022-10-05T11:12:01.000Z")
```

### deep
- **deepFreeze(val:Object)**
Recursively freezes all properties of an object
```typescript
const myObj = deepFreeze({
	a: 2,
	b: {
		c: 3,
		d: {
			e: 'hello',
		}
	}
});
Object.isFrozen(myObj); // TRUE
Object.isFrozen(myObj.b); // TRUE
Object.isFrozen(myObj.b.d); // TRUE
```

- **deepSeal(val:Object)**
Recursively freezes all properties of an object
```typescript
const myObj = deepSeal({
	a: 2,
	b: {
		c: 3,
		d: {
			e: 'hello',
		}
	}
});
Object.isSealed(myObj); // TRUE
Object.isSealed(myObj.b); // TRUE
Object.isSealed(myObj.b.d); // TRUE
Object.isFrozen(myObj.b.d); // FALSE
```

- **deepSet(obj:Object, path:string, value:any=null, define:boolean=false)**
Sets a property and its value deep in the structure of an object
```typescript
const myObj = {
	a: 2,
};
deepSet(myObj, 'b.c.d.e', 4);
myObj.b.c.d.e; // 4
```

```typescript
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
};
deepSet(myObj, 'b[0].price', 100);
deepSet(myObj, 'b[1].price', 500);
myObj.b[0].price; // 100
myObj.b[1].price; // 500
```

```typescript
const myObj = {
	a: 2,
};
deepSet(myObj, 'b.c', { value: function () => {...} }, true);
myObj.b.c; // Function
```

- **deepGet(obj:Object, path:string, get_parent:boolean=false)**
Retrieves a value based on a path in a deeply nested object
```typescript
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
};
deepGet(myObj, 'b[0].price', true); // [{price: 2}, {price: 4}]
```

```typescript
const myObj = {
	a: 2,
	b: [
		{ price : 2 },
		{ price : 4 },
	],
};
deepGet(myObj, 'b[0].price'); // 2
```

### equal
- **equal(a:any, b:any)**
Check if a variable is equal to another one
```typescript
equal(5, 6); // FALSE
equal(1, 1); // TRUE
equal([0, 1, 2], [1, 2]); // FALSE
equal({a: 1, b: 2}, {a: 1, b: 3}); // FALSE
equal({a: 1, b: 2}, {a: 1, b: 2}); // TRUE
equal(new Date('2012-20-09'), '2012-20-09'); // TRUE ( check is being done on unix timestamp )
equal(new RegExp(/ab+c/, 'i'), /ab+c/i); // TRUE
```

### function
- **isFunction(val:unknown)**
Check if a variable is a Function

- **isAsyncFunction(val:unknown):boolean**
Check if a variable is an async function

- **noop()**
An empty function that can be used in (for example) piping

- **noopreturn(val:any)**
An empty function that will pass back the variable that it was passed

- **noopresolve(val:any)**
An empty function that returns a promise that will immediately resolve itself and pass back any variable that was passed to it

- **sleep(val:int)**
An empty function that returns a promise that will resolve after X milliseconds, default is set to 1000ms.
**

### formdata
- **isFormData(val:any)**
Check if a variable is of type FormData
```typescript
isFormData(new FormData()); // TRUE
isFormData({hi: 'there'}); // FALSE
```

### hash
- **guid()**
Generate a unique identifier (guid) according to RFC4122
```typescript
guid(); // 245caf1a-86af-11e7-bb31-be2e44b06b34
```

- **fnv1A(val:any)**
Generate a fnv1A hash from an object, using a 32-bit prime/offset
```typescript
fnv1A('hello world'); // -2023343616
fnv1A({a:1,b:2}); // 361168128
fnv1A(4); // 1630425728
fnv1A(new RegExp(/ab+c/, 'i')); // 2131692544
fnv1A(new Date('2012-02-02')); // 1655579136
```

### number
- **isNumber(val:any)**
Check if a variable is a number
```typescript
isNumber('foo'); // FALSE
isNumber(4); // TRUE
isNumber(0.5); // TRUE
```

- **isNumberAbove(val:number, comp:number)**
Check if a variable is a number above a certain bound
```typescript
isNumberAbove(5, 0); // TRUE
isNumberAbove(.1, 0); // TRUE
isNumberAbove(-1, -1); // FALSE
isNumberAbove(-10, -9); // FALSE
```

- **isNumberAboveOrEqual(val:number, comp:number)**
Check if a variable is a number above or equal to a certain bound
```typescript
isNumberAboveOrEqual(5, 0); // TRUE
isNumberAboveOrEqual(.1, 0); // TRUE
isNumberAboveOrEqual(-1, -1); // TRUE
isNumberAboveOrEqual(-10, -9); // FALSE
```

- **isNumberBelow(val:number, comp:number)**
Check if a variable is a number below a certain bound
```typescript
isNumberBelow(0, 5); // TRUE
isNumberBelow(0, .1); // TRUE
isNumberBelow(-1, -1); // FALSE
isNumberBelow(-9, -10); // FALSE
```

- **isNumberBelowOrEqual(val:number, comp:number)**
Check if a variable is a number below or equal a certain bound
```typescript
isNumberBelowOrEqual(0, 5); // TRUE
isNumberBelowOrEqual(0, .1); // TRUE
isNumberBelowOrEqual(-1, -1); // TRUE
isNumberBelowOrEqual(-9, -10); // FALSE
```

- **isNumberBetween(val:number, min:number, max:number)**
Check if a variable is a number between a range of numbers
```typescript
isNumberBetween(5, 0, 10); // TRUE
isNumberBetween(.1, 0, 1); // TRUE
isNumberBetween(-.1, -1, 0); // TRUE
isNumberBetween(0, 0, 1); // TRUE
isNumberBetween(-1, 0, 1); // FALSE
```

- **isInteger(val:any)**
Check if a variable is an integer
```typescript
isInteger('foo'); // FALSE
isInteger(4); // TRUE
isInteger(0.5); // FALSE
```

- **isIntegerAbove(val:number, comp:number)**
Check if a variable is an integer above a certain bound
```typescript
isIntegerAbove(5, 0); // TRUE
isIntegerAbove(.1, 0); // FALSE
isIntegerAbove(-1, -1); // FALSE
isIntegerAbove(-10, -9); // FALSE
```

- **isIntegerAboveOrEqual(val:number, comp:number)**
Check if a variable is an integer above or equal to a certain bound
```typescript
isIntegerAboveOrEqual(5, 0); // TRUE
isIntegerAboveOrEqual(.1, 0); // FALSE
isIntegerAboveOrEqual(-1, -1); // TRUE
isIntegerAboveOrEqual(-10, -9); // FALSE
```

- **isIntegerBelow(val:number, comp:number)**
Check if a variable is an integer below a certain bound
```typescript
isIntegerBelow(0, 5); // TRUE
isIntegerBelow(0, .1); // TRUE
isIntegerBelow(.4, 5); // FALSE
isIntegerBelow(-1, -1); // FALSE
isIntegerBelow(-9, -10); // FALSE
```

- **isIntegerBelowOrEqual(val:number, comp:number)**
Check if a variable is an integer below or equal to a certain bound
```typescript
isIntegerBelowOrEqual(0, 5); // TRUE
isIntegerBelowOrEqual(0, .1); // TRUE
isIntegerBelowOrEqual(.4, 5); // FALSE
isIntegerBelowOrEqual(-1, -1); // TRUE
isIntegerBelowOrEqual(-9, -10); // FALSE
```

- **isIntegerBetween(val:number, min:number, max:number)**
Check if a variable is an integer between a range of numbers
```typescript
isIntegerBetween(5, 0, 10); // TRUE
isIntegerBetween(.1, 0, 1); // FALSE
isIntegerBetween(-.1, -1, 0); // FALSE
isIntegerBetween(0, 0, 1); // TRUE
isIntegerBetween(-1, 0, 1); // FALSE
```

- **isNumericalNaN(val:any)**
Check if a variable is a numerical nan ( a number that is a NaN, this distinguishment is made since both a string or a number can be NaN)
```typescript
isNumericalNaN('foo'); // FALSE
isNumericalNaN(NaN); // TRUE
```

- **toPercentage(val:Number,precision:Number=0,min:Number=0,max:Number=1)**
Calculate the percentage of a specific value in a range
```typescript
toPercentage(0.50106579, 5); // 50.11658
toPercentage(-356, 0, -1000, 1000); // 32
toPercentage(0.5); // 50
```

- **round(val:Number,precision:Number=0)**
Round a numeric value to a specific amount of decimals
```typescript
round(5.123456789, 0); // 5
round(5.123456789, 2); // 5.12
round(5.123456789, 5); // 5.12346
```

- **randomBetween(min:Number=0,max:Number=10)**
Generate a random numeric value between a min and max range
```typescript
randomBetween(); // Will generate a random between 0 and 10
randomBetween(25, 100); // Will generate a random between 25 and 100
```

- **randomIntBetween(min:Number=0,max:Number=10)**
Generate a random numeric value between a min and max range (max not inclusive)
```typescript
randomIntBetween(); // Will generate a random between 0 and 10 (10 not inclusive)
randomIntBetween(25, 100); // Will generate a random between 25 and 100 (100 not inclusive)
```

### object
- **isObject(val:any)**
Check if a variable is of type Object
```typescript
isObject({a: 1}); // TRUE
isObject(1); // FALSE
```

- **isNotEmptyObject(val:any)**
Check if a variable a non-empty object
```typescript
isNotEmptyObject({a:1}); // TRUE
isNotEmptyObject({}); // FALSE
isNotEmptyObject('Hi'); // FALSE
```

- **pick(obj:Object={}, keys:Array[string]=[])**
Copies the keys passed in the 'keys' array from the passed object to a new object and returns that object.**
<small>If a key wasn't found it will be set as undefined</small>
```typescript
pick({a: 1, b: 2, c: 3}, ['a','b']); // {a: 1, b: 2}
```

- **merge(target:Object={},obj:Object={})**
Merges two objects together, with the preference over the second object.
```typescript
merge({a: 1, b: false}, {a: 900, c: 50}); // {a: 900, b: false, c: 50}
```

- **define(props:Object, obj:Object={})**
Creates an object with the passed accessors set on it
```typescript
define(
	{
		a: {
			enumerable: false,
			value : function () { ... }
		}
	},
	{ b: 2 }
);
// { a : () => ..., b: 2 }
```

```typescript
define({
	a : {
		enumerable: false,
		value : function () { ... }
	}
}); // { a : () => ... }
```

### regexp
- **isRegExp(val:any)**
Check if a variable is an instance of RegExp
```typescript
isRegExp('foo'); // FALSE
isRegExp(new RegExp('ab+c', 'i')); // TRUE
isRegExp(new RegExp(/ab+c/, 'i')); // TRUE
isRegExp(/ab+c/i); // FALSE
```

- **sanitize(val:string)**
Escapes special characters in a string and returns a sanitized version safe for usage in RegExp instances
```typescript
sanitizeRegExp('contact@valkyriestudios.be'); // contact@valkyriestudios\\.be
```

### string
- **isString(val:any)**
Check if a variable is a string
```typescript
isString('foo'); // TRUE
isString(4); // FALSE
```

- **isStringBetween(val:string, min:number, max:number, trimmed:boolean=true)**
Check if a variable is between a range of numbers
```typescript
isStringBetween('Peter', 4, 10); // TRUE
isStringBetween('Jeff', 4, 10); // TRUE
isStringBetween('Moe', 4, 10); // FALSE
isStringBetween('Hello', 6, 1); // FALSE
isStringBetween('    Joe', 1, 3); // TRUE
isStringBetween('    Joe', 1, 3, false); // FALSE
```

- **isNotEmptyString(val:any, trimmed:boolean=true)**
Check if a variable a non-empty string
```typescript
isNotEmptyString({a:1}); // FALSE
isNotEmptyString(''); // FALSE
isNotEmptyString(' '); // FALSE
isNotEmptyString(' ', false); // TRUE
isNotEmptyString('Hi'); // TRUE
```

- **shorten(val:any, length:integer, postfix:string=...)**
Shorten a string and add a postfix if string went over length
```typescript
shorten('To the moon and beyond', 11, '..'); // 'To the moon..'
shorten('Hi', 250); // 'Hi'
shorten('To the moon and beyond'); // 'To the moon...'
shorten('To the moon and beyond', 11, ' '); // 'To the moon '
```

- **humanizeBytes(val:number|string)**
Humanize an amount of bytes
-- option:delim (default:','): Override the delimiter used, eg: `20000 -> 20,000`
-- option:separator (default:'.'): Override the separator used for floats, eg: '20.034' -> '20,034'
-- option:precision (default:2):  Override decimal precision for floats: eg: '20.0344233' with precision 2 -> '20.03'
-- option:units (default:[' byes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB']): Override units used, eg: `4893290423489 with units [' Jedi', ' Darth', ' Vader', ' Force'] and precision of 0` -> `'4,893 Force'`
```typescript
humanizeBytes(1504230); // '1.4 MB'
humanizeBytes(23); // '23 bytes'
humanizeBytes(-374237489237); // '-348.5 GB'
humanizeBytes('-1504230'); // '-1.4 MB'
```

- **humanizeNumber(val:number|string, options:Object)**
Humanize a number
-- option:delim (default:','): Override the delimiter used, eg: `20000 -> 20,000`
-- option:separator (default:'.'): Override the separator used for floats, eg: '20.034' -> '20,034'
-- option:precision (default:2):  Override decimal precision for floats: eg: '20.0344233' with precision 2 -> '20.03'
-- option:units (default:['', 'k', 'm', 'b', 't', 'q']): Override units used, eg: `1073741823 with units ['', 'K']` -> `1.073.741,82K`
-- option:real (default:false): Set to true to automatically round input numbers
-- option:divider (default:1000): Override default divider used for units (used internally for humanizeBytes with 1024 as divider)

```typescript
humanizeNumber(4327963279469432); // '4.33q'
humanizeNumber(1504230); // '1.5m'
humanizeNumber(-432443); // '-432.44k'
humanizeNumber('-1500'); // '-1.5k'
humanizeNumber(47328748923747923479); // '47,328.75q'
```

allows passing options to control the output, following options are possible:

## Contributors
- [Peter Vermeulen](https://www.linkedin.com/in/petervermeulen1/)
