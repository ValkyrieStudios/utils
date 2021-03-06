# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

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
