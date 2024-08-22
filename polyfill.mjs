// @ts-check

import { regExpEscape } from './escape.mjs'

/** @type {import('./types.ts')} */

Object.defineProperty(RegExp, 'escape', {
	value: regExpEscape,
	writable: true,
	enumerable: false,
	configurable: true,
})
