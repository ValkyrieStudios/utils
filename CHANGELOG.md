# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

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

### Improved
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

### Improved
- Caching : Memoize, adjust memoization to use fnv1A hashing function for internal cache storage and lookup

## [2.2.0] - 2017-10-14
### Added
- Number : isNumericalNaN, check if something is a strict numerical nan
- RegExp : isRegExp, validate whether or not a variable is a regex
- Function : noopresolve, resolve a promise without taking any action
- FormData : isFormData, validate whether or not a variable is a FormData object

### Improved
- Equal : Add NaN, RegExp and Date diffing
- Update outdated dependencies and add babel-core

### Breaking
- Adjust the default value for pick from undefined to null if the key doesn't exist

## [2.1.0] - 2017-08-21
### Added
- MIT License

## [2.0.0] - 2017-08-21

Initial Release
