#!/usr/bin/env -S deno test -A --watch

import './polyfill.mjs'
import { assertEquals, assertMatch } from '@std/assert'

const tests = [
	['Hello, 🌍!$^.', '\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\.'],
	['_foo', '_foo'],
	['foo', '\\x66oo'],
	['\n', '\\n'],
	['\r', '\\r'],
	['\t', '\\t'],
	['\v', '\\v'],
	['\f', '\\f'],
] as const

Deno.test('RegExp.escape()', async (t) => {
	for (const [input, expected] of tests) {
		await t.step(input, async (t) => {
			await t.step('escaping', () => {
				assertEquals(RegExp.escape(input), expected)
			})

			await t.step('matching', () => {
				assertMatch(input, new RegExp(RegExp.escape(input)))
			})
		})
	}
})
