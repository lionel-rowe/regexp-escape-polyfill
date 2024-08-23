#!/usr/bin/env -S deno bench -A --watch

import { configs } from './configs.ts'

const str = 'Hello, 🌍!$^.'

const versions = await Promise.all(configs.map(async ({ repo, import: import_, ident }) => {
	const isRelative = import_.startsWith('./')
	const path = isRelative ? new URL(import_, `file://${Deno.cwd()}/`).pathname : import_

	const fn = (await import(path))[ident]
	return { repo, fn }
}))

for (const { repo, fn } of versions) {
	Deno.bench(repo, () => {
		fn(str)
	})
}
