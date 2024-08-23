type Config = {
	repo: string
	import: string
	ident: string
}

export const configs: Config[] = [
	{
		repo: 'https://github.com/lionel-rowe/regexp-escape-polyfill',
		import: './escape.mjs',
		ident: 'regExpEscape',
	},
	{
		repo: 'https://github.com/es-shims/RegExp.escape',
		import: 'https://esm.sh/regexp.escape@2.0.1',
		ident: 'default',
	},
	{
		repo: 'https://github.com/denoland/std',
		import: '@std/regexp/escape',
		ident: 'escape',
	},
]
