#!/usr/bin/env -S deno test -A --watch
// @ts-nocheck dynamic imports, plain js code, global patching etc.

import { escape } from './escape.ts'
import { walk } from 'jsr:@std/fs'

RegExp.escape = escape

globalThis.assert = {
	sameValue(actual: unknown, expected: unknown) {
		if (actual !== expected) {
			throw new Error(`Expected ${expected}; got ${actual}`);
		}
	},
	throws(ErrType: typeof Error, fn: () => unknown) {
		try {
			fn();
		} catch (e) {
			if (!(e instanceof ErrType)) {
				throw new Error(`Expected an exception of type ${ErrType}; got ${e}`);
			}
			return;
		}

		throw new Error(`Expected an exception: ${fn}`);
	},
}

const ignoredTests = [
	'cross-realm.js',
	'not-a-constructor.js',
	'length.js',
	'prop-desc.js',
	'name.js',
]

Deno.test("RegExp.escape", async (t) => {
	for await (const entry of walk('./test262/test/built-ins/RegExp/escape/')) {
		if (entry.isFile && !ignoredTests.includes(entry.name)) {
			await t.step(entry.name, async () => {
				await import(import.meta.resolve('./' + entry.path));
			});
		}
	}
});
