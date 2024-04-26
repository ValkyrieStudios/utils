# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- **feat**: array/* namespace export
- **feat**: array namespace export has the following shorthand alias: `is`, `isNe`, `isNotEmpty`, `isNeArray`
- **feat**: boolean/* namespace export
- **feat**: boolean namespace export has the following shorthand alias: `is`
- **feat**: caching/* namespace export
- **feat**: date/* namespace export
- **feat**: date namespace export has the following shorthand alias: `is`
- **feat**: deep/* namespace export
- **feat**: deep namespace export has the following shorthand alias: `seal`, `freeze`, `get`, `set`
- **feat**: hash/* namespace export
- **feat**: formdata/is - Utility to verify whether or not a passed value is an instance of FormData, also acts as a typeguard
- **feat**: formdata/* namespace export
- **feat**: formdata namespace export has the following shorthand aliases: `is`

## [12.4.0] - 2024-04-18
### Improved
- **dx**: array/mapFn will now infer the return type of the map and allows passing a generic
```typescript
type User = {first_name:string};
const users:User[] = [{first_name: 'Peter'}, {first_name: 'Jack'}];

/**
 * At this point the type of map will be Record<string, User>
 * Take note: the key function function also knows that it is receiving an instance of User
 */
const map = mapFn(users, el => el.first_name); 
```

- **dx**: array/mapKey will now infer the return type of the map and allows passing a generic
```typescript
type User = {first_name:string};
const users:User[] = [{first_name: 'Peter'}, {first_name: 'Jack'}];

/* At this point the type of map will be Record<string, User> */
const map = mapKey(users, 'first_name'); 
```
- **sys**: All methods now offer both named and default exports to allow for working with non-modularized setups, for example:
```typescript
/* Only available way previously */
import guid from '@valkyriestudios/utils/hash/guid' 

/* Now also possible */
import {guid} from '@valkyriestudios/utils/hash/guid';
```
- **deps**: Upgrade @types/node to 20.12.7
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.7.0
- **deps**: Upgrade @typescript-eslint/parser to 7.7.0
- **deps**: Upgrade typescript to 5.4.5

## [12.3.0] - 2024-04-09
### Improved
- **dx**: function/is and Is.Function now work with a cleaner type guard than 'Function' and instead work with (...args:unknown[]) => unknown
- **dx**: function/isAsync and Is.AsyncFunction now work with a cleaner type guard than 'Function' and instead work with (...args:unknown[]) => Promise<unknown>

## [12.2.1] - 2024-04-09
### Improved
- **deps**: Upgrade @types/node to 20.12.6
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.6.0
- **deps**: Upgrade @typescript-eslint/parser to 7.6.0

### Fixed
- **bug**: Revert changes to dedupe introduced in 12.1.0 as doesn't work correctly for non-primitive values

## [12.2.0] - 2024-04-09
### Improved
- **dx**: array/is and Is.Array now use a type guard
- **dx**: array/isNotEmpty, Is.NeArray, Is.NotEmptyArray now use a type guard
- **dx**: boolean/is and Is.Boolean now use a type guard
- **dx**: date/is and Is.Date now use a type guard
- **dx**: function/is and Is.Function now use a type guard
- **dx**: function/isAsync and Is.AsyncFunction now use a type guard
- **dx**: number/is, Is.Num, Is.Number now use a type guard
- **dx**: number/isAbove, Is.NumGt, Is.NumAbove, Is.NumberAbove now use a type guard
- **dx**: number/isAboveOrEqual, Is.NumGte, Is.NumAboveOrEqual, Is.NumberAboveOrEqual now use a type guard
- **dx**: number/isBelow, Is.NumLt, Is.NumBelow, Is.NumberBelow now use a type guard
- **dx**: number/isBelowOrEqual, Is.NumLte, Is.NumBelowOrEqual, Is.NumberBelowOrEqual now use a type guard
- **dx**: number/isBetween, Is.NumBetween, Is.NumberBetween now use a type guard
- **dx**: number/isInteger, Is.Int, Is.Integer now use a type guard
- **dx**: number/isIntegerAbove, Is.IntGt, Is.IntAbove, Is.IntegerAbove now use a type guard
- **dx**: number/isIntegerAboveOrEqual, Is.IntGte, Is.IntAboveOrEqual, Is.IntegerAboveOrEqual now use a type guard
- **dx**: number/isIntegerBelow, Is.IntLt, Is.IntBelow, Is.IntegerBelow now use a type guard
- **dx**: number/isIntegerBelowOrEqual, Is.IntLte, Is.IntBelowOrEqual, Is.IntegerBelowOrEqual now use a type guard
- **dx**: number/isIntegerBetween, Is.IntBetween, Is.IntegerBetween now use a type guard
- **dx**: object/is, Is.Object now use a type guard
- **dx**: object/isNotEmpty, Is.NeObject, Is.NotEmptyObject now use a type guard
- **dx**: regexp/is, Is.RegExp now use a type guard
- **dx**: string/is, Is.String now use a type guard
- **dx**: string/isBetween, Is.StringBetween now use a type guard
- **dx**: string/isNotEmpty, Is.NeString, Is.NotEmptyString now use a type guard

## [12.1.0] - 2024-04-05
### Improved
- **feat**: string/shorten - Will now only accept integers for length
- **perf**: array/dedupe - Significant performance improvement by moving away from fnv hashing to using native Sets
- **perf**: array/join - ~20% performance improvement thanks to reducing internal operations 
- **perf**: array/shuffle - Remove unnecessary length check
- **perf**: array/mapFn - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: array/mapPrimitive - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: array/mapPrimitive - ~15% performance improvement when mapping strings thanks to reducing internal operations regarding trimming
- **perf**: array/mapKey - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: array/sort - Minor performance improvement thanks to reducing internal operations regarding key lookups
- **perf**: deep/set - Minor performance improvement thanks to using precompiled regex and caching internal length checks
- **perf**: object/pick - Minor ~4% performance improvement thanks to using a precompiled regex and dropping the global flag
- **perf**: string/humanizeBytes - ~15-25% performance improvement thanks to reducing internal operations and simplifying logic in humanizeNumber
- **perf**: string/humanizeNumber - ~5-10% performance improvement thanks to reducing internal operations and simplifying logic in humanizeNumber
- **perf**: string/shorten - Minor performance improvement due to swapping Number.isFinite for Number.isInteger
- **deps**: Upgrade @types/node to 20.12.4
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.5.0
- **deps**: Upgrade @typescript-eslint/parser to 7.5.0
- **deps**: Upgrade typescript to 5.4.4

## [12.0.0] - 2024-03-07
### Added
- **feat**: date/format - Formatting utility using spec-based formatting strings. Eg `format(new Date('2022-01-01T04:32:19.000Z'), 'YYYY-MM-DD') -> 2022-01-01`.
- **deps**: full-icu (used for format testing)

### Improved
- **feat**: equal - Significant performance improvements (~10% to 35%) due to adjusting in favor of early escape mechanics
- **feat**: date/addUTC - Medium performance improvement ~10% due to reduction of internal function calls
- **feat**: regexp/is - Medium performance improvement ~20% due to adjusting in favor of instanceof checks over prototypal checks
- **deps**: Upgrade @types/node to 20.11.25
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.1.1
- **deps**: Upgrade @typescript-eslint/parser to 7.1.1
- **deps**: Upgrade typescript to 5.4.2

## [11.7.0] - 2024-02-27
### Improved
- **dx**: deep/freeze - Now works with generics to ensure proper typing and flagging as Readonly
- **dx**: deep/seal - Now works with generics to ensure proper typing
- **feat**: object/merge - Further simplication of merge logic leading to minor performance improvements
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.1.0
- **deps**: Upgrade @typescript-eslint/parser to 7.1.0
- **deps**: Upgrade eslint to 8.57.0

## [11.6.0] - 2024-02-23
### Improved
- **perf**: object/merge - Further performance improvement (~8%) due to further simplification of code by using proto object checks
- **perf**: object/pick - Slight performance improvement (~3%) due to simplication of code being able to remove an internal check

## [11.5.0] - 2024-02-22
### Improved
- **perf**: array/dedupe - Reduce memory footprint of dedupe when working on larger arrays by using a set over a map
- **perf**: array/mapFn - Slight performance improvement (~1%) due to spread vs Object.assign (in favor of spread)
- **perf**: array/mapKey - Slight performance improvement (~5%) due to spread vs Object.assign (in favor of spread)
- **perf**: array/sort - Slight performance improvement (~5%) due to push vs spread (in favor of push) as well as removing one internal operation 
- **perf**: object/merge - Decent performance improvement (~20%) due to simplication of code in favor of 'for ... in' over Object.keys reducer
- **deps**: Upgrade @types/node to 20.11.20
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.0.2
- **deps**: Upgrade @typescript-eslint/parser to 7.0.2

## [11.4.0] - 2024-02-15
### Added
- **feat**: function/isAsync - Returns true when the passed value is an async function

### Improved
- **dx**: swap out usage of any for unknown where possible
- **deps**: Upgrade @types/node to 20.11.18
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.0.1
- **deps**: Upgrade @typescript-eslint/parser to 7.0.1

## [11.3.0] - 2024-02-08
### Improved
- **dx**: array/dedupe now makes use of generics
- **dx**: function/noopresolve now makes use of generics
- **dx**: function/noopreturn now makes use of generics

## [11.2.0] - 2024-02-08
### Added
- **sys**: Publish script

### Improved
- **sys**: Remove exports from package.json and use publish script to generate dist folder

## [11.1.0] - 2024-02-08
### Improved
- **dx**: Add global declaration file 🚀

## [11.0.0] - 2024-02-08
### Added
- **sys**: Migrate to Typescript and as such comes with declarations 🚀
- **sys**: Module exports setup in package.json which goes hand in hand with the typescript declaration support, allowing for improved DX across the board 😎
- **deps**: esbuild-register@3.5.0
- **deps**: typescript@5.3.3
- **deps**: @types/node
- **deps**: @typescript-eslint/eslint-plugin@6.21.0
- **deps**: @typescript-eslint/parser@6.21.0
- **deps**: nyc@15.1.0

### Improved
- **deps**: Upgrade eslint to 8.56.0
- **feat**: function/sleep - Will now internally check whether or not the value passed to it is a number above 0 and fallback to 0 if that is not the case
- **feat**: deep/set - Will now reject paths containing \_\_proto\_\_, constructor, prototype as keys to prevent possibility of prototype pollution
- **feat**: deep/seal - Will now allow arrays as input
- **feat**: deep/freeze - Will now allow arrays as input
- **feat**: array/mapPrimitive - Now allows passing a number for valround, which in turn will be used to round to a certain decimal precision

### Removed
- **deps**: @babel/cli
- **deps**: @babel/core
- **deps**: @babel/preset-env
- **deps**: @babel/register
- **deps**: babel-plugin-module-extension
- **deps**: babel-plugin-transform-minify-booleans
- **deps**: babel-plugin-transform-remove-console
- **deps**: c8 (in favor of moving back to nyc due to proper ts support)

### Breaking
- **string/shorten**: Will now return original string or empty string instead of false when invalid props are passed

## [10.0.0] - 2023-12-14
### Improved
- **sys**: Remove old travis build badge from readme
- **sys**: Add codeql badge to readme
- **perf**: ~25% performance improvement in string/shorten
- **perf**: ~18% performance improvement in object/pick
- **perf**: 5 to 10% performance degration in date/is, date/startOfUTC, date/addUTC, date/diff, date/endOfUTC, date/toUnix, date/toUTC due to more rigid checks on whether or not a Date is a truly valid date (see Breaking section)

### Breaking
- **feat**: The usage of non-literal string formats (eg: `new String(...)`) will no longer be supported to allow for further performance improvements during validity checks. This should not impact many people as the usage of strings in that format has been discouraged for many years. For example: `isString('hello')` and `isString(String('hello'))` will return true, but `isString(new String('hello'))` will no longer return true as a string literal and a string object are two different things. Usage of String objects can lead to side-effects, for example: `new String('hello') == new String('hello')` returns false
- **feat**: The usage of non-literal boolean formats (eg: `new Boolean(...)`) will no longer be supported to allow for further performance improvements during validity checks. This should not impact many people as the usage of booleans in that format has been discouraged for many years. For example: `isBoolean(false)` and `isBoolean(Boolean(false))` will return true, but `isBoolean(new Boolean(false))` will no longer return true as a boolean literal and a boolean object are two different things. Usage of boolean objects can lead to side-effects, for example: `new Boolean(false) == new Boolean(false)` returns false
- **feat**: date/is - Will now return false if a date object was instantiated with an invalid date (eg: `New Date('invalid_date')`)

## [9.0.0] - 2023-12-07
### Breaking
- **sys**: Removed data/countries.json, this has now been moved to https://www.npmjs.com/package/@valkyriestudios/data-countries
- **sys**: Removed data/continents.json, this has now been moved to https://www.npmjs.com/package/@valkyriestudios/data-continents

## [8.4.0] - 2023-12-06
### Improved
- **feat**: deep/get - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: object/merge - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: array/mapKey - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: array/sort - Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- **feat**: array/sort - Now wraps a custom filter function to ensure non-empty object checks are always applied, this also means custom filter functions no longer need to pass this themselves

## [8.3.0] - 2023-12-06
### Added
- **deps**: babel-plugin-module-extension@0.1.3

### Improved
- **deps**: Upgrade eslint to 8.55.0
- **sys**: Rerun benchmark for v8 on intel i9

### Fixed
- **bug**: deep/get - Fix edge case issue where cursor is not an object or array when parts still exist afterwards

## [8.2.0] - 2023-11-29
### Improved
- **deps**: Upgrade @babel/core to 7.23.5
- **deps**: Upgrade @babel/preset-env to 7.23.5
- **feat**: deep/get - Allow handling of deep keys containing multiple array denominators
- **feat**: deep/set - Allow handling of deep keys containing multiple array denominators

## [8.1.0] - 2023-11-29
### Improved
- **sys** Reverted module type change that caused breakage due to esm vs cjs compatibility
- **sys** Adjusted src files and test files to work with .mjs extension

## [8.0.0] - 2023-11-29
### Added
- **deps**: c8\@8.0.1
- **sys**: Internal benchmark script to produce ops/sec for close to all util functions
- **feat**: date/startOfUTC - Add support for week_mon as mode (alias for week with monday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_tue as mode (tuesday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_wed as mode (wednesday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_thu as mode (thursday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_fri as mode (friday as first day of the week)
- **feat**: date/startOfUTC - Add support for week_sat as mode (saturday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_mon as mode (alias for week with monday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_tue as mode (tuesday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_wed as mode (wednesday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_thu as mode (thursday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_fri as mode (friday as first day of the week)
- **feat**: date/endOfUTC - Add support for week_sat as mode (saturday as first day of the week)

### Improved
- **deps**: Upgrade @babel/cli to 7.23.4
- **sys**: Switch from using chai/mocha to node native test runner
- **perf**: hash/fnv1A - Improved performance thanks to predefined constants and reducing internal overhead regarding conversion
- **perf**: array/dedupe - Improved performance due to replacement of filter and object map by for with native map
- **perf**: deep/freeze - Improved performance due to replacement of forEach with native for
- **perf**: deep/seal - Improved performance due to replacement of forEach with native for
- **perf**: deep/get - Improved performance due to order change during path interpolation
- **perf**: deep/set - Improved performance due to order change during path interpolation
- **perf**: date/startOfUTC - Improved performance for start of week and quarter calculation due to improved internal handling
- **perf**: date/endOfUTC - Improved performance for start of week and quarter calculation due to improved internal handling
- **perf**: string/humanizeBytes - Will now be magnitudes faster (50x) due to ditching usage of Intl for separator handling
- **perf**: object/pick: Will now be magnitudes faster (7x) if working with non-deep keys (eg: pick(obj, ['g.d', 'g.e']))
- **feat**: string/shorten - Will no longer return false but an empty string when passed a string that is empty after trimming
- **feat**: string/isBetween - Will now validate that min and max are passed as above or equal to 0
- **feat**: string/humanizeNumber - Will now be magnitudes faster (50x) due to ditching usage of Intl for separator handling
- **feat**: object/pick: Will now throw when passed an empty array of keys
- **feat**: object/merge: Will now throw when passed a non-object target and source (previously only non-object target)
- **perf**: Improvements across a plethora of functions due to internal usage swaps in favor of Number.isFinite, Number.isInteger and Array.isArray leading to reduction of function calls andless Heap chatter
- **sys**: Published package will now also include original src files which can be imported in @valkyriestudios/utils/src, this allows anyone wishing to use in esm format to do so

### Breaking
- **feat**: The usage of non-primitive number formats (eg: `new Number(...)`) will no longer be supported to allow for performance improvements during validity checks. This should not impact many people as the usage of numbers in that format has been discouraged for many years.

### Fixed
- **bug**: deep/set - Fix an issue where multiple runs of deepSet could throw errors when trying to assign a deeper value to a value that was previously set to a primitive
- **bug**: deep/set - Fix an issue preventing building up of deep arrays using eg: deepSet({a: []}, 'a.0.name', 'Peter')
- **bug**: deep/get - Fix an issue where deepGet would throw an error instead of returning undefined when diving into certain keys that don't exist on deep objects and arrays

### Removed
- **deps**: babel-plugin-check-es2015-constants (as not needed)
- **deps**: babel-plugin-transform-member-expression-literals (as not needed)
- **deps**: babel-plugin-transform-property-literals (as not needed)
- **deps**: chai (in favor of native node test runner)
- **deps**: chai-as-promised (in favor of native node test runner)
- **deps**: chai-spies (in favor of native node test runner)
- **deps**: mocha (in favor of native node test runner)
- **deps**: nyc (in favor of native node test runner in combination with c8)
- **feat**: object/defineFrozen: As these worked on a pass-by-reference and if misunderstood could have certain unwanted side-effects
- **feat**: object/defineSealed: As these worked on a pass-by-reference and if misunderstood could have certain unwanted side-effects
- **feat**: object/zip
- **feat**: object/forValues

## [7.5.0] - 2023-10-22
### Improved
- **deps**: Upgrade @babel/cli to 7.23.0
- **deps**: Upgrade @babel/core to 7.23.2
- **deps**: Upgrade @babel/preset-env to 7.23.2
- **deps**: Upgrade @babel/register to 7.22.15
- **deps**: Upgrade chai to 4.3.10
- **deps**: Upgrade eslint to 8.52.0
- **feat**: date/addUTC now supports millisecond/milliseconds as keys

## [7.4.0] - 2023-08-10
### Added
- **feat**: regexp/sanitize

### Improved
- **deps**: Upgrade @babel/cli to 7.22.10
- **deps**: Upgrade @babel/core to 7.22.10
- **deps**: Upgrade @babel/preset-env to 7.22.10
- **deps**: Upgrade eslint to 8.46.0

## [7.3.0] - 2023-06-25
### Added
- **feat**: data/continents.json
- **feat**: data/countries.json

### Improved
- **deps**: Upgrade eslint to 8.43.0

## [7.2.0] - 2023-06-11
### Added
- **feat**: date/toUnix - Convert a date to its corresponding unix timestamp in seconds (1.000.000 ops in ~300ms)
- **feat**: date/diff - (supports week,day,hour,minute,millisecond) (1.000.000 ops in ~650ms)

### Improved
- **deps**: Upgrade @babel/cli to 7.22.5
- **deps**: Upgrade @babel/core to 7.22.5
- **deps**: Upgrade @babel/preset-env to 7.22.5
- **deps**: Upgrade @babel/register to 7.22.5
- **deps**: Upgrade eslint to 8.42.0

## [7.1.0] - 2023-05-13
### Added
- **feat**: date/addUTC
- **feat**: date/endOfUTC with support for year,quarter,month,week,week_sun,day,hour,minute,second

### Improved
- **feat**: date/startOfUTC - now supports 'quarter'
- **feat**: date/startOfUTC - now supports 'week' (monday as first day of the week)
- **feat**: date/startOfUTC - now supports 'week_sun' (sunday as first day of the week)

## [7.0.0] - 2023-05-07
### Added
- **deps**: @babel/cli
- **sys**: .babelrc
- **sys**: Switch to using babel-cli for transpiling build
- **feat**: date/startOfUTC

### Improved
- **deps**: Upgrade @babel/core to 7.21.8
- **deps**: Upgrade eslint to 8.40.0

### Removed
- **deps**: gulp
- **deps**: gulp-babel
- **sys**: gulpfile
- **feat**: array/mapPrimitive - keytrim option

## [6.3.0] - 2023-05-01
### Added
- **feat**: date/toUTC

## [6.2.0] - 2023-04-29
### Added
- **feat**: date/nowUnix
- **feat**: date/nowUnixMs

### Improved
- **feat**: number/round - Improve precision on edge case numbers by using epsilon differentiator
- **perf**: number/round - Improve performance and add benchmark (1.000.000 round ops in ~250ms)
- **deps**: Upgrade @babel/core to 7.21.5
- **deps**: Upgrade @babel/preset-env to 7.21.5

## [6.1.0] - 2023-04-23
### Improved
- **sys**: Reduce eventual bundle size for package

## [6.0.0] - 2023-04-22
### Added
- **feat**: array/sort
- **feat**: string/humanizeNumber (with delim, separator, precision, units, divider) options
- **feat**: number/randomIntBetween
- **feat**: number/isAboveOrEqual
- **feat**: number/isBelowOrEqual
- **feat**: number/isIntegerAboveOrEqual
- **feat**: number/isIntegerBelowOrEqual
- **feat**: Is@NumberBelowOrEqual
- **feat**: Is@NumberAboveOrEqual
- **feat**: Is@IntegerBelowOrEqual
- **feat**: Is@IntegerAboveOrEqual
- **feat**: Is@Equal
- **feat**: Is@Eq (as alias of Is@Equal)
- **feat**: Is@NeArray (alias of Is@NotEmptyArray)
- **feat**: Is@NeObject (alias of Is@NotEmptyObject)
- **feat**: Is@NeString (alias of Is@NotEmptyString)
- **feat**: Is@Num (alias of Is@Number)
- **feat**: Is@NumBelow (alias of Is@NumberBelow)
- **feat**: Is@NumBelowOrEqual (alias of Is@NumberBelowOrEqual)
- **feat**: Is@NumAbove (alias of Is@NumberAbove)
- **feat**: Is@NumAboveOrEqual (alias of Is@NumberAboveOrEqual)
- **feat**: Is@NumBetween (alias of Is@NumberBetween)
- **feat**: Is@NumLt (alias of Is@NumberBelow)
- **feat**: Is@NumLte (alias of Is@NumberBelowOrEqual)
- **feat**: Is@NumGt (alias of Is@NumberAbove)
- **feat**: Is@NumGte (alias of Is@NumberAboveOrEqual)
- **feat**: Is@Int (alias of Is@Integer)
- **feat**: Is@IntBelow (alias of Is@IntegerBelow)
- **feat**: Is@IntBelowOrEqual (alias of Is@IntegerBelowOrEqual)
- **feat**: Is@IntAbove (alias of Is@IntegerAbove)
- **feat**: Is@IntAboveOrEqual (alias of Is@IntegerAboveOrEqual)
- **feat**: Is@IntBetween (alias of Is@IntegerBetween)
- **feat**: Is@IntLt (alias of Is@IntegerBelow)
- **feat**: Is@IntLte (alias of Is@IntegerBelowOrEqual)
- **feat**: Is@IntGt (alias of Is@IntegerAbove)
- **feat**: Is@IntGte (alias of Is@IntegerAboveOrEqual)

### Improved
- **deps**: Upgrade eslint to 8.39.0
- **feat**: object/pick - Now internally validates keys as strings and autotrims keys when picking
- **feat**: number/round - Will only accept integers for precision variable from now on
- **feat**: string/humanizeBytes - Now humanizes the real number part and allows passing a custom delimiter for natural numbers (eg: 1024 -> 1,024, 1024 {delim:'.'} -> 1.024)
- **feat**: string/humanizeBytes - Now allows passing a custom separator (eg: 10.024 {separator: ','} -> 10,024)
- **feat**: string/humanizeBytes - Now allows passing a precision variable (default:2) 
- **feat**: string/humanizeBytes -Now allows passing a custom units array (eg: humanizeBytes(1024, {units: [' Jedi', ' Darth']}) -> 1 Darth, humanizeBytes(20, {units: [' Jedi', 'Darth']}) -> 20 Jedi)
- **perf**: number/round - Performance improvement due to usage of scientific notation not requiring math.pow
- **perf**: hash/guid - Is now 4x faster than previous implementation thanks to usage of bitwise operators and a precalculated hexmap (0-255), able to generate 50.000 guids in ~65ms and also no longer relying on high-performance timers

## [5.4.0] - 2023-04-08
### Added
- **feat**: String/humanizeBytes

### Improved
- **deps**: Upgrade eslint to 8.38.0

## [5.3.1] - 2023-03-31
### Improved
- **deps**: Upgrade @babel/core to 7.21.4
- **deps**: Upgrade @babel/preset-env to 7.21.4
- **deps**: Upgrade @babel/register to 7.21.0
- **deps**: Upgrade eslint to 8.37.0
- **deps**: Upgrade mocha to 10.2.0

### Fixed
- **bug**: number/randomBetween - Fix issue where min is not properly taken into account

## [5.3.0] - 2022-11-20
### Added
- **feat**: array/shuffle - Fisher-Yates implementation O(n) shuffling algorithm, can be used to shuffle arrays of both primitives and non-primitives

### Improved
- **deps**: Upgrade @babel/core to 7.20.2
- **deps**: Upgrade @babel/preset-env to 7.20.2
- **deps**: Upgrade chai to 4.3.7
- **deps**: Upgrade eslint to 8.28.0
- **deps**: Upgrade mocha to 10.1.0
- **feat**: caching/memoize - Now allows a resolver function to be passed to allow custom cache key generation

## [5.2.0] - 2022-10-09
### Added
- **feat**: array/join
- **feat**: number/isInteger
- **feat**: number/isIntegerBelow
- **feat**: number/isIntegerAbove
- **feat**: number/isIntegerBetween
- **feat**: Is@Integer
- **feat**: Is@IntegerBelow
- **feat**: Is@IntegerAbove
- **feat**: Is@IntegerBetween

### Improved
- **deps**: Upgrade @babel/core to 7.19.3
- **deps**: Upgrade @babel/preset-env to 7.19.3
- **deps**: Upgrade @babel/register to 7.18.9
- **deps**: Upgrade eslint to 8.24.0
- **sys**: Add .nycrc, .babelrc, .eslintrc.json, .travis.yml, test/ to npm ignore

### Removed
- **sys**: .eslintrc (legacy file)

## [5.1.0] - 2022-07-17
### Added
- **feat**: string/shorten
- **feat**: array/mapKey
- **feat**: array/mapFn
- **feat**: array/mapPrimitive

### Improved
- **feat**: array/dedupe - will now check whether or not passed variable is a non-empty array
- **feat**: number/isNumericalNaN - will now also work with raw NaN checks
- **perf**: number/randomBetween, number/round, number/toPercentage no longer double check against isNumericalNaN as this behavior is already built-in to isNumber

## [5.0.0] - 2022-07-16
### Added
- **feat**: number/isBelow
- **feat**: number/isAbove
- **feat**: Is.NumberBelow
- **feat**: Is.NumberAbove
- **deps**: mocha@10.0.0
- **deps**: nyc@15.1.0
- **deps**: chai@4.3.6
- **deps**: chai-as-promised@7.1.1
- **deps**: chai-spies@1.0.0
- **deps**: eslint@8.19.0
- **deps**: @babel/core@7.18.6
- **deps**: @babel/preset-env@7.18.6
- **deps**: @babel/register@7.18.6
- **sys**: .eslintrc.json
- **sys**: .nycrc
- **sys**: .babelrc
- **sys**: npm command: lint

### Improved
- **deps**: Upgrade babel-loader to 8.2.5
- **deps**: Upgrade gulp-babel to 8.0.0
- **sys**: Switched to using mocha/nyc instead of karma for unit testing and coverage
- **sys**: Npm build will now also lint code according to eslint spec
- **feat**: Improve on validation for path handling on deepGet and deepSet 

### Removed
- **feat**: formdata/is
- **feat**: Is.FormData
- **deps**: webpack
- **deps**: puppeteer
- **deps**: karma-webpack
- **deps**: karma-spec-reporter
- **deps**: karma-jasmine
- **deps**: karma-coverage
- **deps**: karma-chrome-launcher
- **deps**: karma
- **deps**: jasmine-core
- **deps**: babel-core
- **deps**: babel-loader
- **deps**: babel-preset-env

## [4.2.0] - 2021-11-05
### Added
- **feat**: number/isBetween
- **feat**: string/isNotEmpty
- **feat**: string/isBetween
- **feat**: object/isNotEmpty
- **feat**: array/isNotEmpty
- **feat**: New unified 'Is' object, containing easy access to almost all is* functions through single import
-- Is.Array
-- Is.NotEmptyArray
-- Is.Boolean
-- Is.Date
-- Is.FormData
-- Is.Function
-- Is.Number
-- Is.RegExp
-- Is.Object
-- Is.NotEmptyObject
-- Is.String
-- Is.NotEmptyString

### Improved
- **feat**: isNumericalNaN now returns true for Infinity

### Fixed
- **bug**: isNumber - no longer returns true for a numerical NaN, eg: isNumber(1/0) now returns false
- **bug**: fnv1A - now converts NaN as a fixed 'NaN' for hash calculation

## [4.1.0] - 2021-02-01
### Added
- **feat**: functions/sleep

## [4.0.0] - 2020-11-01
### Improved
- **sys**: Switch folder structure to be single file per function, allowing for tree shaking to be applied more easily when being bundled

## [3.1.1] - 2018-11-23
### Added
- **sys**: Codecoverage integration
- **test**: Date and fnv1A hash
- **test**: RegExp and fnv1A hash
- **test**: unsupported properties and fnv1A hash
- **test**: unsupported properties in deepSeal
- **test**: unsupported properties in deepFreeze

### Fixed
- **bug**: Fixed an issue where '' would come back as undefined in deepGet

## [3.1.0] - 2018-11-18
### Breaking
- **feat**: Adjusted pick behavior to not set undefined as default and instead not return the key in the object

### Added
- **feat**: number/toPercentage
- **test**: number/toPercentage

## [3.0.2] - 2018-08-23
### Improved
- **sys**: Removed license badge as not working

## [3.0.1] - 2018-08-23
### Added
- **sys**: Badges on readme regarding build status, monthly downloads, version, license

### Improved
- **sys**: Updated package.json file with better metadata

## [3.0.0] - 2018-08-23
### Added
- **feat**: number/round
- **feat**: number/randomBetween
- **test**: Object utils
- **test**: Caching utils
- **test**: Hash utils
- **test**: Function utils
- **test**: FormData utils
- **test**: Deep utils
- **test**: Equal utils
- **test**: Date utils
- **test**: String utils
- **test**: RegExp utils
- **test**: Boolean utils
- **test**: Array utils
- **test**: Numeric utils

### Improved
- **feat**: object/zip - added default_to variable to adjust the behavior of defaulting
- **feat**: object/forValues - you no longer need to apply the change to the object but simply return the changed value (see readme for example)
- **deps**: Update outdated dependencies

### Fixed
- **bug**: Various bugfixes based on test results

### Breaking
- **feat**: Remove md5 hashing function as hashing was not correctly applied

## [2.4.0] - 2017-10-16
### Added
- **feat**: function/is

## [2.3.0] - 2017-10-15
### Added
- **feat**: object/forValues - utility function to loop over the values of an object and apply an identity callback to each
- **feat**: hash/fnv1A - hashing function based on fowler-noll-vo (fnv) that generates a hash based on a provided payload
- **feat**: array/dedupe - function that removes duplicates from an array

### Changed
- **feat**: caching/memoize - adjust memoization to use fnv1A hashing function for internal cache storage and lookup

## [2.2.0] - 2017-10-14
### Added
- **feat**: number/isNumericalNaN - check if something is a strict numerical nan
- **feat**: regexp/is - validate whether or not a variable is a regex
- **feat**: function/noopresolve - resolve a promise without taking any action
- **feat**: formdata/is - validate whether or not a variable is a FormData object

### Changed
- **feat**: equal - Add NaN, RegExp and Date diffing
- **deps**: Update outdated dependencies and add babel-core

### Breaking
- **feat**: Adjust the default value for pick from undefined to null if the key doesn't exist

## [2.1.0] - 2017-08-21
### Added
- **sys**: MIT License

## [2.0.0] - 2017-08-21

Initial Release
