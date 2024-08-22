const SYNTAX_CHARACTERS = /[\^$\\.*+?()[\]{}|]/;

const CONTROL_ESCAPES = new Map([
  ["\t", "t"],
  ["\n", "n"],
  ["\v", "v"],
  ["\f", "f"],
  ["\r", "r"],
]);

const OTHER_PUNCTUATORS = /^[,\-=<>#&!%:;@~'`"]$/;
const WHITE_SPACE = /^[\t\v\f\uFEFF\p{Zs}]$/u;
const LINE_TERMINATOR = /^[\n\r\u2028\u2029]$/;
const SURROGATE = /^[\uD800-\uDFFF]$/;

const DECIMAL_DIGIT = /^[0-9]$/;
const ASCII_LETTER = /^[a-zA-Z]$/;

/**
 * @param str A string.
 * @returns the escaped string.
 */
function regExpEscape(str: string): string {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  let escaped = "";
  for (const c of str) {
    if (escaped === "" && (DECIMAL_DIGIT.test(c) || ASCII_LETTER.test(c))) {
      escaped += `\\x${c.codePointAt(0)!.toString(16).padStart(2, "0")}`;
    } else {
      escaped += encodeForRegExpEscape(c);
    }
  }
  return escaped;
}

/**
 * @param c A single code-point char.
 * @returns the encoded representation of `c`.
 */
function encodeForRegExpEscape(c: string): string {
  if (SYNTAX_CHARACTERS.test(c) || c === "/") {
    return "\\" + c;
  }
  if (CONTROL_ESCAPES.has(c)) {
    return "\\" + CONTROL_ESCAPES.get(c);
  }

  if (
    OTHER_PUNCTUATORS.test(c) || WHITE_SPACE.test(c) ||
    LINE_TERMINATOR.test(c) || SURROGATE.test(c)
  ) {
    // deno-lint-ignore no-control-regex
    if (/[\x00-\xFF]/.test(c)) {
      return `\\x${c.codePointAt(0)!.toString(16).padStart(2, "0")}`;
    }

	return c.split("").map((c) => unicodeEscape(c)).join("");
  }
  return c;
}

function unicodeEscape(c: string): string {
  return `\\u${c.codePointAt(0)!.toString(16).padStart(4, "0")}`;
}

/**
 * Escapes arbitrary text for interpolation into a regexp, such that it will
 * match exactly that text and nothing else.
 *
 * @example Usage
 * ```ts
 * import { escape } from "@std/regexp/escape";
 * import { assertEquals, assertMatch, assertNotMatch } from "@std/assert";
 *
 * const re = new RegExp(`^${escape(".")}$`, "u");
 *
 * assertEquals("^\\.$", re.source);
 * assertMatch(".", re);
 * assertNotMatch("a", re);
 * ```
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escape(str: string): string {
  return regExpEscape(str);
}
