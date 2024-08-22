declare global {
	interface RegExpConstructor {
		/**
		 * Escapes arbitrary text for interpolation into a regexp, such that it will match exactly that text and nothing else.
		 *
		 * @param {string} str - The string to escape.
		 * @returns {string} the escaped string.
		 */
		escape(str: string): string
	}
}
