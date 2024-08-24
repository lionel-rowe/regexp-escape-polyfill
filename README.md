# `RegExp.escape` polyfill and ponyfill

Polyfill and ponyfill for the upcoming [`escape()`](https://github.com/tc39/proposal-regex-escaping/) static method of `RegExp` (proposal currently at Stage 3).

Currently passes all [test262](https://github.com/tc39/test262/tree/main/test/built-ins/RegExp/escape) tests except for `cross-realm.js`, which I'm ignoring for now.

## Usage

### Ponyfill (no global patching)

```js
import { regExpEscape } from 'jsr:@li/regexp-escape-polyfill'

const str = 'Hello, 🌍!$^.'

regExpEscape(str) // "\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\."
new RegExp(regExpEscape(str)).test(str) // true
```

### Polyfill (patches `RegExp` globally)

```js
import 'jsr:@li/regexp-escape-polyfill/global'

const str = 'Hello, 🌍!$^.'

RegExp.escape(str) // "\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\."
new RegExp(RegExp.escape(str)).test(str) // true
```

### Adding global TS support
<!-- Must be patched in manually due to https://github.com/denoland/deno/issues/23427 -->

```ts
import 'jsr:@li/regexp-escape-polyfill/global'
import type { RegExpEscapeFn } from 'jsr:@li/regexp-escape-polyfill/global'

declare global {
	interface RegExpConstructor {
		escape: RegExpEscapeFn
	}
}

RegExp.escape("ok") // passes type checking
```

## Benchmarks

<!-- <benchmarks> -->
```txt
Deno/1.46.0 x86_64-unknown-linux-gnu
Intel(R) Core(TM) i7-1065G7 CPU @ 1.30GHz
```

Name | Time (avg) | Iter/s | Bundle size (minified + gzipped) | Details
---|---|---|---|---
[lionel-rowe/regexp-escape-polyfill](https://github.com/lionel-rowe/regexp-escape-polyfill) | 1.222 µs | 817,741.3 | [498 B](https://bundlejs.com/?q=jsr%3A%40li%2Fregexp-escape-polyfill&treeshake=%5B*%5D) | Modern JS/ESM only, with TS support; aims for full compatibility with the spec (verified via test262) but may differ on implementation details.
[es-shims/RegExp.escape](https://github.com/es-shims/RegExp.escape) | 10.808 µs | 92,524.1 | [7.1 kB](https://bundlephobia.com/package/regexp.escape@2.0.1) | Aims for ES3 compliance; written with CJS modules; more closely follows the implementation details of the algorithm in the spec.
[zloirock/core-js](https://github.com/zloirock/core-js) | 1.506 µs | 663,652.8 | [5.29 kB](https://bundlejs.com/?q=core-js-pure%2Factual%2Fregexp%2Fescape&treeshake=%5B*%5D) | CoreJS implementation; ES5 (?) support including various other polyfills; written with CJS modules
[denoland/std](https://github.com/denoland/std) | 574 ns | 1,741,322.9 | [279 B](https://bundlejs.com/?q=jsr%3A%40std%2Fregexp%2Fescape&treeshake=%5B*%5D) | Written before the proposal reached Stage 3; written in TS/ESM; doesn't aim for spec compliance, but fulfills the same function.
<!-- </benchmarks> -->
