#!/usr/bin/env -S deno test -A --watch

import { assertEquals, assertMatch } from '@std/assert'
import { regExpEscape } from './escape.mjs'

const str = 'Hello, 🌍!$^.'

const tests = [
	[str, '\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\.'],
	['_foo', '_foo'],
	['foo', '\\x66oo'],
	['\n', '\\n'],
	['\r', '\\r'],
	['\t', '\\t'],
	['\v', '\\v'],
	['\f', '\\f'],
] as const

Deno.test('regExpEscape()', async (t) => {
	for (const [input, expected] of tests) {
		await t.step(input, () => {
			assertEquals(regExpEscape(input), expected)
		})
	}
})

Deno.test('matching', async (t) => {
	await t.step('matches', () => {
		assertMatch(str, new RegExp(regExpEscape(str)))
	})
})
