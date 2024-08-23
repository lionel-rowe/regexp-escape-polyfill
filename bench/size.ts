#!/usr/bin/env -S deno run -A --watch

import { denoPlugins } from '@luca/esbuild-deno-loader'
import { parse } from '@std/jsonc'
import { format } from '@std/fmt/bytes'
import { configs } from './configs.ts'
import { Table } from '@cliffy/table'

await using esbuild = await (async () => {
	const mod = await import('esbuild')

	return Object.assign({ ...mod }, {
		[Symbol.asyncDispose]() {
			return mod.stop()
		},
	})
})()

const { imports } = parse(await Deno.readTextFile('./deno.jsonc'))
const importMapURL = `data:application/json;base64,${btoa(JSON.stringify({ imports }))}`

class TempFile {
	path: Promise<string>

	constructor() {
		this.path = Deno.makeTempFile()
	}

	async [Symbol.asyncDispose]() {
		await Deno.remove(await this.path)
	}
}

const results = await Promise.all(configs.map(async (config) => {
	await using tempFile = new TempFile()
	const path = await tempFile.path

	await esbuild.build({
		plugins: [...denoPlugins({ importMapURL })],
		entryPoints: [config.import],
		format: 'esm',
		bundle: true,
		minify: true,
		outfile: path,
	})

	const { pathname } = new URL(config.repo)

	const out = await Deno.readFile(path)

	return { name: pathname.slice(1), size: format(out.length) }
}))

const headings = Object.keys(results[0])

console.info(
	new Table().border().header(headings).body(results.map((r) => Object.values(r))).toString(),
)
