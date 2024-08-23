#!/usr/bin/env -S deno run -A --watch

import './polyfill.mjs'
import { stripAnsiCode } from '@std/fmt/colors'

const cwd = new URL(import.meta.resolve('./')).pathname

const td = new TextDecoder()

const perf = td.decode(
	(await new Deno.Command(Deno.execPath(), {
		args: ['bench', '-A', './bench/perf.ts'],
		stdout: 'piped',
		cwd,
	}).spawn().output()).stdout,
)
	.replaceAll(new RegExp(`(?:file://)?${RegExp.escape(Deno.cwd())}`, 'g'), '.')

const size = td.decode(
	(await new Deno.Command(Deno.execPath(), {
		args: ['run', '-A', './bench/size.ts'],
		stdout: 'piped',
		cwd,
	}).spawn().output()).stdout,
)

const readmePath = './README.md'
let readme = await Deno.readTextFile(readmePath)

for (const [k, v] of Object.entries({ perf, size })) {
	const output = stripAnsiCode(v)
	readme = readme.replace(
		new RegExp(String.raw`(<!--\s*<${k}>\s*-->)(?:[\s\S]*?)(<!--\s*<\/${k}>\s*-->)`, 'g'),
		`$1\n\`\`\`txt\n${output.trim()}\n\`\`\`\n$2`,
	)
}

await Deno.writeTextFile(readmePath, readme)
