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

## Comparisons

Comparisons with `es-shims/RegExp.escape` and `denoland/std`'s `regexp/escape`.

- `lionel-rowe/regexp-escape-polyfill`: Modern JS/ESM only; aims for full compatibility with the spec (verified via test262) but may differ on implementation details.
- `es-shims/RegExp.escape`: Aims for ES3 compliance; written with CJS modules; more closely follows the implementation details of the algorithm in the spec.
- `denoland/std`'s `regexp/escape`: Written before the proposal reached Stage 3; written in TS/ESM; doesn't aim for spec compliance, but fulfills the same function.

### Performance

<!-- <perf> -->
```txt
cpu: Intel(R) Core(TM) i7-1065G7 CPU @ 1.30GHz
runtime: deno 1.46.0 (x86_64-unknown-linux-gnu)

./bench/perf.ts
benchmark                               time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------------------------------- -----------------------------
lionel-rowe/regexp-escape-polyfill       1.38 µs/iter     723,113.5     (1.03 µs … 6.06 µs) 1.33 µs 6.06 µs 6.06 µs
es-shims/RegExp.escape                  12.72 µs/iter      78,597.8      (6.51 µs … 1.1 ms) 10.75 µs 80.44 µs 93.65 µs
denoland/std                           624.09 ns/iter   1,602,340.8    (456.8 ns … 1.05 µs) 677.46 ns 1.05 µs 1.05 µs
```
<!-- </perf> -->

### Size

<!-- <size> -->
```txt
┌────────────────────────────────────┬─────────┐
│ name                               │ size    │
├────────────────────────────────────┼─────────┤
│ lionel-rowe/regexp-escape-polyfill │ 793 B   │
├────────────────────────────────────┼─────────┤
│ es-shims/RegExp.escape             │ 84.2 kB │
├────────────────────────────────────┼─────────┤
│ denoland/std                       │ 444 B   │
└────────────────────────────────────┴─────────┘
```
<!-- </size> -->
