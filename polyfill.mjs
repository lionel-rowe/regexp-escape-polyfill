// @ts-check

import { regExpEscape } from './escape.mjs'

/** @type {import('./types.ts')} */

if (!Object.hasOwn(RegExp, 'escape')) {
	Object.defineProperty(RegExp, 'escape', {
		value: regExpEscape,
		writable: true,
		enumerable: false,
		configurable: true,
	})
}
