#!/usr/bin/env -S deno bench -A --watch

import esShimsVersion from 'https://esm.sh/regexp.escape@2.0.1'
import { regExpEscape } from './escape.mjs'
import { escape as denoStdVersion } from '@std/regexp/escape'

const str = 'Hello, 🌍!$^.'

// https://github.com/lionel-rowe/regexp-escape-polyfill
Deno.bench('lionel-rowe/regexp-escape-polyfill', () => {
	regExpEscape(str)
})

// https://github.com/es-shims/RegExp.escape
Deno.bench('es-shims/RegExp.escape', () => {
	esShimsVersion(str)
})

// https://github.com/denoland/std
Deno.bench('denoland/std', () => {
	denoStdVersion(str)
})
