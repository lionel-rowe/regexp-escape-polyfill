declare global {
	interface RegExpConstructor {
		/**
		 * Escapes arbitrary text for interpolation into a regexp, such that it will match exactly that text and nothing else.
		 *
		 * @param str - The string to escape.
		 * @returns the escaped string.
		 */
		escape(str: string): string
	}
}
