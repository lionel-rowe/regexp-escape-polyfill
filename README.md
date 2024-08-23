# `RegExp.escape` polyfill and ponyfill

Polyfill and ponyfill for the upcoming [`escape()`](https://github.com/tc39/proposal-regex-escaping/) static method of `RegExp` (proposal currently at Stage 3).

Currently passes all [test262](https://github.com/tc39/test262/tree/main/test/built-ins/RegExp/escape) tests except for `cross-realm.js`, which I'm ignoring for now.

## Usage

### Ponyfill (no global patching)

```js
import { regExpEscape } from 'regexp-escape-polyfill/escape.mjs'

const str = 'Hello, 🌍!$^.'

regExpEscape(str) // "\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\."
new RegExp(regExpEscape(str)).test(str) // true
```

### Polyfill (patches `RegExp` globally)

```js
import 'regexp-escape-polyfill/polyfill.mjs'

const str = 'Hello, 🌍!$^.'

RegExp.escape(str) // "\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\."
new RegExp(RegExp.escape(str)).test(str) // true
```

## Benchmarks

<!-- <benchmarks> -->
```txt
Deno/1.46.0 x86_64-unknown-linux-gnu
Intel(R) Core(TM) i7-1065G7 CPU @ 1.30GHz
```

Name | Time (avg) | Iter/s | Bundle size (minified) | Details
---|---|---|---|---
[lionel-rowe/regexp-escape-polyfill](https://github.com/lionel-rowe/regexp-escape-polyfill) | 1.301 µs | 768,315.5 | 793 B | Modern JS/ESM only, with TS support; aims for full compatibility with the spec (verified via test262) but may differ on implementation details.
[es-shims/RegExp.escape](https://github.com/es-shims/RegExp.escape) | 11.189 µs | 89,373.5 | 84.2 kB | Aims for ES3 compliance; written with CJS modules; more closely follows the implementation details of the algorithm in the spec.
[zloirock/core-js](https://github.com/zloirock/core-js) | 1.567 µs | 637,988.6 | 88.2 kB | CoreJS implementation; ES5 (?) support including various other polyfills; written with CJS modules
[denoland/std](https://github.com/denoland/std) | 587 ns | 1,701,196.9 | 444 B | Written before the proposal reached Stage 3; written in TS/ESM; doesn't aim for spec compliance, but fulfills the same function.
<!-- </benchmarks> -->
