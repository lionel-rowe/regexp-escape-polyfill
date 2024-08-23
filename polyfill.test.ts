#!/usr/bin/env -S deno test -A --watch

import './polyfill.mjs'
import { walk } from '@std/fs'

for (
	const [fileName, idents] of [
		['assert.js', ['assert']],
		['isConstructor.js', ['isConstructor']],
		['sta.js', ['Test262Error']],
		['propertyHelper.js', ['verifyProperty']],
	] as const
) {
	eval(
		`${await Deno.readTextFile(`./test262/harness/${fileName}`)}\n${
			idents.map((ident) => `globalThis.${ident} = ${ident}`).join('\n')
		}`,
	)
}

const ignoredTests = [
	// skip
	'cross-realm.js',
	// run after all the other tests as it deletes the RegExp.escape property as a side-effect
	'prop-desc.js',
]

Deno.test('RegExp.escape', async (t) => {
	for await (const entry of walk('./test262/test/built-ins/RegExp/escape/')) {
		if (entry.isFile && !ignoredTests.includes(entry.name)) {
			await t.step(entry.name, async () => {
				await import(import.meta.resolve('./' + entry.path))
			})
		}
	}

	await t.step('prop-desc.js', async () => {
		await import(import.meta.resolve('./test262/test/built-ins/RegExp/escape/prop-desc.js'))
	})
})
