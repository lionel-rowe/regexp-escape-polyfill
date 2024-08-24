// @ts-check
/// <reference types="./polyfill.types.ts" />

import { regExpEscape } from './escape.mjs'

Object.defineProperty(RegExp, 'escape', {
	value: regExpEscape,
	writable: true,
	enumerable: false,
	configurable: true,
})
