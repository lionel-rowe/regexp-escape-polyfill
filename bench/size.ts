#!/usr/bin/env -S deno run -A --watch

import { denoPlugins } from '@luca/esbuild-deno-loader'
import { parse } from '@std/jsonc'
import { configs } from './configs.ts'

await using esbuild = await (async () => {
	const mod = await import('esbuild')

	return Object.assign({ ...mod }, {
		[Symbol.asyncDispose]() {
			return mod.stop()
		},
	})
})()

// deno-lint-ignore no-explicit-any
const { imports } = parse(await Deno.readTextFile('./deno.jsonc')) as any
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

	const out = await Deno.readFile(path)

	return { name: config.repo, byteLength: out.length }
}))

console.info(JSON.stringify(results, null, '\t'))
