type Config = {
	repo: string
	import: string
	ident: string
	details: string
}

export const configs: Config[] = [
	{
		repo: 'https://github.com/lionel-rowe/regexp-escape-polyfill',
		import: './escape.mjs',
		ident: 'regExpEscape',
		details:
			`Modern JS/ESM only, with TS support; aims for full compatibility with the spec (verified via test262) but may differ on implementation details.`,
	},
	{
		repo: 'https://github.com/es-shims/RegExp.escape',
		import: 'https://esm.sh/regexp.escape@2.0.1',
		ident: 'default',
		details:
			`Aims for ES3 compliance; written with CJS modules; more closely follows the implementation details of the algorithm in the spec.`,
	},
	{
		repo: 'https://github.com/denoland/std',
		import: '@std/regexp/escape',
		ident: 'escape',
		details:
			`Written before the proposal reached Stage 3; written in TS/ESM; doesn't aim for spec compliance, but fulfills the same function.`,
	},
]
