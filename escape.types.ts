/**
 * @module
 *
 * A ponyfill for the upcoming `escape()` static method of `RegExp` (proposal currently at Stage 3).
 *
 * @example
 * ```ts
 * import { regExpEscape } from 'jsr:@li/regexp-escape-polyfill'
 *
 * const str = 'Hello, 🌍!$^.'
 *
 * regExpEscape(str) // "\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\."
 * new RegExp(regExpEscape(str)).test(str) // true
 * ```
 */

/**
 * Escapes arbitrary text for interpolation into a regexp, such that it will match exactly that text and nothing else.
 *
 * @param str - The string to escape.
 * @returns the escaped string.
 */
export declare function regExpEscape(str: string): string
