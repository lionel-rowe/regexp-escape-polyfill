// @ts-check
/// <reference types="./polyfill.globals.ts" />

import { regExpEscape } from './escape.mjs'

/** @type {import('./polyfill.globals.ts')} */
Object.defineProperty(RegExp, 'escape', {
	value: regExpEscape,
	writable: true,
	enumerable: false,
	configurable: true,
})
