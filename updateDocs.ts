#!/usr/bin/env -S deno run -A --watch

import { format as formatMs } from '@std/fmt/duration'
import { format as formatSize } from '@std/fmt/bytes'
import { configs } from './bench/configs.ts'

const cwd = new URL(import.meta.resolve('./')).pathname

const td = new TextDecoder()

const perfData = JSON.parse(td.decode(
	(await new Deno.Command(Deno.execPath(), {
		args: ['bench', '-A', '--json', './bench/perf.ts'],
		stdout: 'piped',
		cwd,
	}).spawn().output()).stdout,
))

let benchmarks = `\`\`\`txt\n${perfData.runtime}\n${perfData.cpu}\n\`\`\`\n\n`

const headers = ['Name', 'Time (avg)', 'Iter/s', 'Bundle size (minified)', 'Details']
benchmarks += headers.join(' | ') + '\n'
benchmarks += headers.map(() => '---').join('|') + '\n'

const sizeData: { name: string; byteLength: number }[] = JSON.parse(td.decode(
	(await new Deno.Command(Deno.execPath(), {
		args: ['run', '-A', './bench/size.ts'],
		stdout: 'piped',
		cwd,
	}).spawn().output()).stdout,
))

for (const { name, results } of perfData.benches) {
	const { pathname } = new URL(name)

	const avgTime = formatNs(results[0].ok.avg)

	const iterPerSec = (1e9 / results[0].ok.avg).toLocaleString('en-US', {
		maximumFractionDigits: 1,
	})
	const { byteLength } = sizeData.find(({ name: n }) => n === name)!
	const { details } = configs.find(({ repo }) => repo === name)!

	benchmarks += [
		`[${pathname.slice(1)}](${name})`,
		avgTime,
		iterPerSec,
		formatSize(byteLength),
		details,
	].join(' | ') +
		'\n'
}

const readmePath = './README.md'
let readme = await Deno.readTextFile(readmePath)

for (const [k, v] of Object.entries({ benchmarks })) {
	readme = readme.replace(
		new RegExp(String.raw`(<!--\s*<${k}>\s*-->)(?:[\s\S]*?)(<!--\s*<\/${k}>\s*-->)`, 'g'),
		`$1\n${v.trim()}\n$2`,
	)
}

await Deno.writeTextFile(readmePath, readme)

function formatNs(ns: number, precision = 3) {
	const ms = ns / 1e6
	const parts = formatMs(ms, { ignoreZero: true }).split(/\s+/)
	const { int, unit } = parts.shift()!.match(/^(?<int>\d+)(?<unit>.+)$/)!.groups!
	const fraction = parts.map((x) => parseInt(x).toString().padStart(3, '0')).join('.').replace(/0+$/, '')
		.slice(0, precision)

	return `${int}${fraction ? `.${fraction}` : ''}\xa0${unit}`
}
