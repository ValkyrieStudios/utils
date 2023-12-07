# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [9.0.0] - 2023-12-07
### Breaking
- Removed data/countries.json, this has now been moved to https://www.npmjs.com/package/@valkyriestudios/data-countries
- Removed data/continents.json, this has now been moved to https://www.npmjs.com/package/@valkyriestudios/data-continents

## [8.4.0] - 2023-12-06
### Improved
- deep/get: Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- object/merge: Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- array/mapKey: Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- array/sort: Removed internal usage of `X.hasOwnProperty(key)` in favor of `Object.prototype.hasOwnProperty.call(X, key)`, allowing passing objects without prototype (eg: Object.create(null))
- array/sort: Now wraps a custom filter function to ensure non-empty object checks are always applied, this also means custom filter functions no longer need to pass this themselves

## [8.3.0] - 2023-12-06
### Added
- Dev Dep: babel-plugin-module-extension@0.1.3

### Improved
- Dev Dep: Upgrade eslint to 8.55.0
- Rerun benchmark for v8 on intel i9

### Fixed
- deep/get: Fix edge case issue where cursor is not an object or array when parts still exist afterwards

## [8.2.0] - 2023-11-29
### Improved
- Dev Dep: Upgrade @babel/core to 7.23.5
- Dev Dep: Upgrade @babel/preset-env to 7.23.5
- deep/get: Allow handling of deep keys containing multiple array denominators
- deep/set: Allow handling of deep keys containing multiple array denominators

## [8.1.0] - 2023-11-29
### Improved
- Reverted module type change that caused breakage due to esm vs cjs compatibility
- Adjusted src files and test files to work with .mjs extension

## [8.0.0] - 2023-11-29
### Added
- Dev: Dep: c8\@8.0.1
- Dev: Internal benchmark script to produce ops/sec for close to all util functions
- date/startOfUTC: Add support for week_mon as mode (alias for week with monday as first day of the week)
- date/startOfUTC: Add support for week_tue as mode (tuesday as first day of the week)
- date/startOfUTC: Add support for week_wed as mode (wednesday as first day of the week)
- date/startOfUTC: Add support for week_thu as mode (thursday as first day of the week)
- date/startOfUTC: Add support for week_fri as mode (friday as first day of the week)
- date/startOfUTC: Add support for week_sat as mode (saturday as first day of the week)
- date/endOfUTC: Add support for week_mon as mode (alias for week with monday as first day of the week)
- date/endOfUTC: Add support for week_tue as mode (tuesday as first day of the week)
- date/endOfUTC: Add support for week_wed as mode (wednesday as first day of the week)
- date/endOfUTC: Add support for week_thu as mode (thursday as first day of the week)
- date/endOfUTC: Add support for week_fri as mode (friday as first day of the week)
- date/endOfUTC: Add support for week_sat as mode (saturday as first day of the week)

### Improved
- Dev Dep: Upgrade @babel/cli to 7.23.4
- Switch from using chai/mocha to node native test runner
- hash/fnv1A: Improved performance thanks to predefined constants and reducing internal overhead regarding conversion
- array/dedupe: Improved performance due to replacement of filter and object map by for with native map
- deep/freeze: Improved performance due to replacement of forEach with native for
- deep/seal: Improved performance due to replacement of forEach with native for
- deep/get: Improved performance due to order change during path interpolation
- deep/set: Improved performance due to order change during path interpolation
- date/startOfUTC: Improved performance for start of week and quarter calculation due to improved internal handling
- date/endOfUTC: Improved performance for start of week and quarter calculation due to improved internal handling
- string/shorten: Will no longer return false but an empty string when passed a string that is empty after trimming
- string/isBetween: Will now validate that min and max are passed as above or equal to 0
- string/humanizeNumber Will now be magnitudes faster (50x) due to ditching usage of Intl for separator handling
- string/humanizeBytes: Will now be magnitudes faster (50x) due to ditching usage of Intl for separator handling
- object/pick: Will now throw when passed an empty array of keys
- object/pick: Will now be magnitudes faster (7x) if working with non-deep keys (eg: pick(obj, ['g.d', 'g.e']))
- object/merge: Will now throw when passed a non-object target and source (previously only non-object target)
- Performance improvements across a plethora of functions due to internal usage swaps in favor of Number.isFinite, Number.isInteger and Array.isArray leading to reduction of function calls andless Heap chatter
- Published package will now also include original src files which can be imported in @valkyriestudios/utils/src, this allows anyone wishing to use in esm format to do so

### Breaking
- The usage of non-primitive number formats (eg: `new Number(...)`) will no longer be supported to allow for performance improvements during validity checks. This should not impact many people as the usage of numbers in that format has been discouraged for many years.

### Fixed
- deep/set: Fix an issue where multiple runs of deepSet could throw errors when trying to assign a deeper value to a value that was previously set to a primitive
- deep/set: Fix an issue preventing building up of deep arrays using eg: deepSet({a: []}, 'a.0.name', 'Peter')
- deep/get: Fix an issue where deepGet would throw an error instead of returning undefined when diving into certain keys that don't exist on deep objects and arrays

### Removed
- Dev Dep: babel-plugin-check-es2015-constants (as not needed)
- Dev Dep: babel-plugin-transform-member-expression-literals (as not needed)
- Dev Dep: babel-plugin-transform-property-literals (as not needed)
- Dev Dep: chai (in favor of native node test runner)
- Dev Dep: chai-as-promised (in favor of native node test runner)
- Dev Dep: chai-spies (in favor of native node test runner)
- Dev Dep: mocha (in favor of native node test runner)
- Dev Dep: nyc (in favor of native node test runner in combination with c8)
- object/defineFrozen: As these worked on a pass-by-reference and if misunderstood could have certain unwanted side-effects
- object/defineSealed: As these worked on a pass-by-reference and if misunderstood could have certain unwanted side-effects
- object/zip
- object/forValues

## [7.5.0] - 2023-10-22
### Improved
- Dep: Upgrade @babel/cli to 7.23.0
- Dep: Upgrade @babel/core to 7.23.2
- Dep: Upgrade @babel/preset-env to 7.23.2
- Dep: Upgrade @babel/register to 7.22.15
- Dep: Upgrade chai to 4.3.10
- Dep: Upgrade eslint to 8.52.0
- date/addUTC now supports millisecond/milliseconds as keys

## [7.4.0] - 2023-08-10
### Added
- regexp/sanitize

### Improved
- Dep: Upgrade @babel/cli to 7.22.10
- Dep: Upgrade @babel/core to 7.22.10
- Dep: Upgrade @babel/preset-env to 7.22.10
- Dep: Upgrade eslint to 8.46.0

## [7.3.0] - 2023-06-25
### Added
- data/continents.json
- data/countries.json

### Improved
- Dep: Upgrade eslint to 8.43.0

## [7.2.0] - 2023-06-11
### Added
- date/toUnix: Convert a date to its corresponding unix timestamp in seconds (1.000.000 ops in ~300ms)
- date/diff (supports week,day,hour,minute,millisecond) (1.000.000 ops in ~650ms)

### Improved
- Dep: Upgrade @babel/cli to 7.22.5
- Dep: Upgrade @babel/core to 7.22.5
- Dep: Upgrade @babel/preset-env to 7.22.5
- Dep: Upgrade @babel/register to 7.22.5
- Dep: Upgrade eslint to 8.42.0

## [7.1.0] - 2023-05-13
### Added
- date/addUTC (1.000.000 ops in ~750ms)
- date/endOfUTC (1.000.000 ops in ~600ms), supports year,quarter,month,week,week_sun,day,hour,minute,second

### Improved
- date/startOfUTC now supports 'quarter'
- date/startOfUTC now supports 'week' (monday as first day of the week)
- date/startOfUTC now supports 'week_sun' (sunday as first day of the week)

## [7.0.0] - 2023-05-07
### Added
- Dep: @babel/cli
- .babelrc
- Switch to using babel-cli for transpiling build
- date/startOfUTC (1.000.000 ops in ~500ms)

### Improved
- Dep: Upgrade @babel/core to 7.21.8
- Dep: Upgrade eslint to 8.40.0

### Removed
- Dep: gulp
- Dep: gulp-babel
- gulpfile
- array/mapPrimitive: keytrim option

## [6.3.0] - 2023-05-01
### Added
- date/toUTC (benchmark 1.000.000 opts in ~500ms)

## [6.2.0] - 2023-04-29
### Added
- date/nowUnix
- date/nowUnixMs

### Improved
- number/round: Improve precision on edge case numbers by using epsilon differentiator
- number/round: Improve performance and add benchmark (1.000.000 round ops in ~250ms)
- Dep: Upgrade @babel/core to 7.21.5
- Dep: Upgrade @babel/preset-env to 7.21.5

## [6.1.0] - 2023-04-23
### Improved
- Reduce eventual bundle size for package

## [6.0.0] - 2023-04-22
### Added
- array/sort
- string/humanizeNumber (with delim, separator, precision, units, divider) options
- number/randomIntBetween
- number/isAboveOrEqual
- number/isBelowOrEqual
- number/isIntegerAboveOrEqual
- number/isIntegerBelowOrEqual
- Is@NumberBelowOrEqual
- Is@NumberAboveOrEqual
- Is@IntegerBelowOrEqual
- Is@IntegerAboveOrEqual
- Is@Equal
- Is@Eq (as alias of Is@Equal)
- Is@NeArray (alias of Is@NotEmptyArray)
- Is@NeObject (alias of Is@NotEmptyObject)
- Is@NeString (alias of Is@NotEmptyString)
- Is@Num (alias of Is@Number)
- Is@NumBelow (alias of Is@NumberBelow)
- Is@NumBelowOrEqual (alias of Is@NumberBelowOrEqual)
- Is@NumAbove (alias of Is@NumberAbove)
- Is@NumAboveOrEqual (alias of Is@NumberAboveOrEqual)
- Is@NumBetween (alias of Is@NumberBetween)
- Is@NumLt (alias of Is@NumberBelow)
- Is@NumLte (alias of Is@NumberBelowOrEqual)
- Is@NumGt (alias of Is@NumberAbove)
- Is@NumGte (alias of Is@NumberAboveOrEqual)
- Is@Int (alias of Is@Integer)
- Is@IntBelow (alias of Is@IntegerBelow)
- Is@IntBelowOrEqual (alias of Is@IntegerBelowOrEqual)
- Is@IntAbove (alias of Is@IntegerAbove)
- Is@IntAboveOrEqual (alias of Is@IntegerAboveOrEqual)
- Is@IntBetween (alias of Is@IntegerBetween)
- Is@IntLt (alias of Is@IntegerBelow)
- Is@IntLte (alias of Is@IntegerBelowOrEqual)
- Is@IntGt (alias of Is@IntegerAbove)
- Is@IntGte (alias of Is@IntegerAboveOrEqual)

### Improved
- Dep: Upgrade eslint to 8.39.0
- object/pick: Now internally validates keys as strings and autotrims keys when picking
- number/round: Performance improvement due to usage of scientific notation not requiring math.pow
- number/round: Will only accept integers for precision variable from now on
- hash/guid: Is now 4x faster than previous implementation thanks to usage of bitwise operators and a precalculated hexmap (0-255), able to generate 50.000 guids in ~65ms and also no longer relying on high-performance timers
- string/humanizeBytes: Now humanizes the real number part and allows passing a custom delimiter for natural numbers (eg: 1024 -> 1,024, 1024 {delim:'.'} -> 1.024)
- string/humanizeBytes: Now allows passing a custom separator (eg: 10.024 {separator: ','} -> 10,024)
- string/humanizeBytes: Now allows passing a precision variable (default:2) 
- string/humanizeBytes: Now allows passing a custom units array (eg: humanizeBytes(1024, {units: [' Jedi', ' Darth']}) -> 1 Darth, humanizeBytes(20, {units: [' Jedi', 'Darth']}) -> 20 Jedi)

## [5.4.0] - 2023-04-08
### Added
- String/humanizeBytes

### Improved
- Dep: Upgrade eslint to 8.38.0

## [5.3.1] - 2023-03-31
### Improved
- Dep: Upgrade @babel/core to 7.21.4
- Dep: Upgrade @babel/preset-env to 7.21.4
- Dep: Upgrade @babel/register to 7.21.0
- Dep: Upgrade eslint to 8.37.0
- Dep: Upgrade mocha to 10.2.0

### Fixed
- Number/randomBetween: Fix issue where min is not properly taken into account

## [5.3.0] - 2022-11-20
### Added
- Array/shuffle: Fisher-Yates implementation O(n) shuffling algorithm, can be used to shuffle arrays of both primitives and non-primitives

### Improved
- Dep: Upgrade @babel/core to 7.20.2
- Dep: Upgrade @babel/preset-env to 7.20.2
- Dep: Upgrade chai to 4.3.7
- Dep: Upgrade eslint to 8.28.0
- Dep: Upgrade mocha to 10.1.0
- Caching/memoize: Now allows a resolver function to be passed to allow custom cache key generation

## [5.2.0] - 2022-10-09
### Added
- array/join
- number/isInteger
- number/isIntegerBelow
- number/isIntegerAbove
- number/isIntegerBetween
- Is@Integer
- Is@IntegerBelow
- Is@IntegerAbove
- Is@IntegerBetween

### Improved
- Dep: Upgrade @babel/core to 7.19.3
- Dep: Upgrade @babel/preset-env to 7.19.3
- Dep: Upgrade @babel/register to 7.18.9
- Dep: Upgrade eslint to 8.24.0
- Add .nycrc, .babelrc, .eslintrc.json, .travis.yml, test/ to npm ignore

### Removed
- .eslintrc (legacy file)

## [5.1.0] - 2022-07-17
### Added
- string/shorten
- array/mapKey
- array/mapFn
- array/mapPrimitive

### Improved
- array/dedupe: will now check whether or not passed variable is a non-empty array
- number/isNumericalNaN: will now also work with raw NaN checks
- number/randomBetween, number/round, number/toPercentage no longer double check against isNumericalNaN as this behavior is already built-in to isNumber

## [5.0.0] - 2022-07-16
### Added
- Feat: number/isBelow
- Feat: number/isAbove
- Feat: Is.NumberBelow
- Feat: Is.NumberAbove
- Dep: mocha@10.0.0
- Dep: nyc@15.1.0
- Dep: chai@4.3.6
- Dep: chai-as-promised@7.1.1
- Dep: chai-spies@1.0.0
- Dep: eslint@8.19.0
- Dep: @babel/core@7.18.6
- Dep: @babel/preset-env@7.18.6
- Dep: @babel/register@7.18.6
- .eslintrc.json
- .nycrc
- .babelrc
- npm command: lint

### Improved
- Dep: Upgrade babel-loader to 8.2.5
- Dep: Upgrade gulp-babel to 8.0.0
- Switched to using mocha/nyc instead of karma for unit testing and coverage
- Npm build will now also lint code according to eslint spec
- Feat: Improve on validation for path handling on deepGet and deepSet 

### Removed
- Feat: formdata/is
- Feat: Is.FormData
- Dep: webpack
- Dep: puppeteer
- Dep: karma-webpack
- Dep: karma-spec-reporter
- Dep: karma-jasmine
- Dep: karma-coverage
- Dep: karma-chrome-launcher
- Dep: karma
- Dep: jasmine-core
- Dep: babel-core
- Dep: babel-loader
- Dep: babel-preset-env

## [4.2.0] - 2021-11-05
### Added
- number/isBetween
- string/isNotEmpty
- string/isBetween
- object/isNotEmpty
- array/isNotEmpty
- New unified 'Is' object, containing easy access to almost all is* functions through single import
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
- isNumericalNaN now returns true for Infinity

### Fixed
- isNumber: no longer returns true for a numerical NaN, eg: isNumber(1/0) now returns false
- fnv1A: now converts NaN as a fixed 'NaN' for hash calculation

## [4.1.0] - 2021-02-01
### Added
- Functions/Sleep

## [4.0.0] - 2020-11-01
### Improved
- Switch folder structure to be single file per function, allowing for tree shaking to be applied more easily when being bundled

## [3.1.1] - 2018-11-23
### Added
- Codecoverage integration
- Testcase for Date and fnv1A hash
- Testcase for RegExp and fnv1A hash
- Testcase for unsupported properties and fnv1A hash
- Testcase for unsupported properties in deepSeal
- Testcase for unsupported properties in deepFreeze

### Fixed
- Fixed an issue where '' would come back as undefined in deepGet

## [3.1.0] - 2018-11-18
### Breaking
- Adjusted pick behavior to not set undefined as default and instead not return the key in the object

### Added
- toPercentage for Numeric utils
- Testcase for toPercentage for Numeric utils

## [3.0.2] - 2018-08-23
### Changed
- Removed license badge as not working

## [3.0.1] - 2018-08-23
### Added
- Badges on readme regarding build status, monthly downloads, version, license

### Changed
- Updated package.json file with better metadata

## [3.0.0] - 2018-08-23
### Added
- Testcases for Object utils
- Testcases for Caching utils
- Testcases for Hash utils
- Testcases for Function utils
- Testcases for FormData utils
- Testcases for Deep utils
- Testcases for Equal utils
- Testcases for Date utils
- Testcases for String utils
- Testcases for RegExp utils
- Testcases for Boolean utils
- Testcases for Array utils
- Testcases for Numeric utils
- Object : zip, added default_to variable to adjust the behavior of defaulting
- Number : round, round a function to a specific precision
- Number : randomBetween, generate a random number between a provided min and max

### Changed
- Update outdated dependencies
- Various bugfixes based on test results
- Object : forValues, you no longer need to apply the change to the object but simply return the changed value (see readme for example)

### Breaking
- Remove md5 hashing function as hashing was not correctly applied

## [2.4.0] - 2017-10-16
### Added
- Function : isFunction, validate whether or not a variable is a function

## [2.3.0] - 2017-10-15
### Added
- Object : forValues, utility function to loop over the values of an object and apply an identity callback to each
- Hash : fnv1A, hashing function based on fowler-noll-vo (fnv) that generates a hash based on a provided payload
- Array : dedupe, function that removes duplicates from an array

### Changed
- Caching : Memoize, adjust memoization to use fnv1A hashing function for internal cache storage and lookup

## [2.2.0] - 2017-10-14
### Added
- Number : isNumericalNaN, check if something is a strict numerical nan
- RegExp : isRegExp, validate whether or not a variable is a regex
- Function : noopresolve, resolve a promise without taking any action
- FormData : isFormData, validate whether or not a variable is a FormData object

### Changed
- Equal : Add NaN, RegExp and Date diffing
- Update outdated dependencies and add babel-core

### Breaking
- Adjust the default value for pick from undefined to null if the key doesn't exist

## [2.1.0] - 2017-08-21
### Added
- MIT License

## [2.0.0] - 2017-08-21

Initial Release
