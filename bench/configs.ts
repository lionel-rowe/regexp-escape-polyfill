type Config = {
	repo: string
	import: string
	ident: string
	details: string
	size: {
		value: string
		link: string
	}
}

export const configs: Config[] = [
	{
		repo: 'https://github.com/lionel-rowe/regexp-escape-polyfill',
		import: './escape.mjs',
		ident: 'regExpEscape',
		details:
			`Modern JS/ESM only, with TS support; aims for full compatibility with the spec (verified via test262) but may differ on implementation details.`,
		size: {
			value: '498 B',
			link: 'https://bundlejs.com/?q=jsr%3A%40li%2Fregexp-escape-polyfill&treeshake=%5B*%5D',
		},
	},
	{
		repo: 'https://github.com/es-shims/RegExp.escape',
		import: 'https://esm.sh/regexp.escape@2.0.1',
		ident: 'default',
		details:
			`Aims for ES3 compliance; written with CJS modules; more closely follows the implementation details of the algorithm in the spec.`,
		size: {
			value: '7.1 kB',
			link: 'https://bundlephobia.com/package/regexp.escape@2.0.1',
		},
	},
	{
		repo: 'https://github.com/zloirock/core-js',
		import: 'https://esm.sh/v135/core-js-pure@3.38.1/actual/regexp/escape',
		ident: 'default',
		details: `CoreJS implementation; ES5 (?) support including various other polyfills; written with CJS modules`,
		size: {
			value: '5.29 kB',
			link: 'https://bundlejs.com/?q=core-js-pure%2Factual%2Fregexp%2Fescape&treeshake=%5B*%5D',
		},
	},
	{
		repo: 'https://github.com/denoland/std',
		import: 'jsr:@std/regexp/escape',
		ident: 'escape',
		details:
			`Written before the proposal reached Stage 3; written in TS/ESM; doesn't aim for spec compliance, but fulfills the same function.`,
		size: {
			value: '279 B',
			link: 'https://bundlejs.com/?q=jsr%3A%40std%2Fregexp%2Fescape&treeshake=%5B*%5D',
		},
	},
]
