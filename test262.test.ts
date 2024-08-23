#!/usr/bin/env -S deno test -A --watch

import { walk } from '@std/fs'

async function getCode(testPath: string) {
	let code = ''

	for (
		const [fileName, idents] of [
			['assert.js', ['assert']],
			['isConstructor.js', ['isConstructor']],
			['sta.js', ['Test262Error']],
			['propertyHelper.js', ['verifyProperty']],
		] as const
	) {
		code += `${await Deno.readTextFile(`./test262/harness/${fileName}`)}\n${
			idents.map((ident) => `globalThis.${ident} = ${ident}`).join('\n')
		}\n`
	}

	code += `await import('./polyfill.mjs')\n`
	code += `await import('./${testPath}')\n`

	return code
}

const ignoredTests = ['cross-realm.js']

Deno.test('RegExp.escape', async (t) => {
	for await (const entry of walk('./test262/test/built-ins/RegExp/escape/')) {
		if (entry.isFile && !ignoredTests.includes(entry.name)) {
			await t.step(entry.name, async () => {
				await new Deno.Command(Deno.execPath(), {
					args: ['eval', await getCode(entry.path)],
					cwd: Deno.cwd(),
				}).spawn().output()
			})
		}
	}
})
