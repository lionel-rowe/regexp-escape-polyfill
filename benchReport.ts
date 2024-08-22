import { stripAnsiCode } from '@std/fmt/colors'

const output = await new Deno.Command(Deno.execPath(), {
	args: ['bench', './bench.ts'],
	stdout: 'piped',
}).spawn().output()

await Deno.writeTextFile('benchReport.txt', stripAnsiCode(new TextDecoder().decode(output.stdout)).trimEnd() + '\n')
