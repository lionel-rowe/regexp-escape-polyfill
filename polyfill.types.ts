/**
 * @module
 *
 * A global polyfill for the upcoming `escape()` static method of `RegExp` (proposal currently at Stage 3).
 *
 * @example
 * ```ts
 * import 'jsr:@li/regexp-escape-polyfill/global'
 * import type { regExpEscape } from 'jsr:@li/regexp-escape-polyfill/global'
 *
 * declare global {
 * 	interface RegExpConstructor {
 * 		escape: typeof regExpEscape
 * 	}
 * }
 *
 * const str = 'Hello, 🌍!$^.'
 *
 * RegExp.escape(str) // "\\x48ello\\x2c\\x20🌍\\x21\\$\\^\\."
 * new RegExp(RegExp.escape(str)).test(str) // true
 * ```
 */

export type { regExpEscape } from './escape.types.ts'
