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
