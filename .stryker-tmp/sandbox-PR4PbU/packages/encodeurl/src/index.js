/**
 * Encode URL characters that are not allowed in URLs.
 * Does NOT encode already-encoded sequences (%XX).
 * @param {string} str - The string to encode
 * @returns {string} The encoded string
 */
// @ts-nocheck

function encodeurl(str) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }

  let result = "";
  let i = 0;
  const len = str.length;

  while (i < len) {
    const char = str.charCodeAt(i);

    // Check if this is a % followed by two hex digits (already encoded)
    if (char === 0x25 && i + 2 < len) {
      const h1 = str.charCodeAt(i + 1);
      const h2 = str.charCodeAt(i + 2);
      if (isHexDigit(h1) && isHexDigit(h2)) {
        result += str[i] + str[i + 1] + str[i + 2];
        i += 3;
        continue;
      }
    }

    // Check if character needs encoding
    if (
      char === 0x20 || // space
      char === 0x21 || // !
      char === 0x22 || // "
      char === 0x23 || // #
      char === 0x24 || // $
      char === 0x26 || // &
      char === 0x27 || // '
      char === 0x28 || // (
      char === 0x29 || // )
      char === 0x2a || // *
      char === 0x2b || // +
      char === 0x2c || // ,
      char === 0x2f || // /
      char === 0x3a || // :
      char === 0x3b || // ;
      char === 0x3c || // <
      char === 0x3d || // =
      char === 0x3e || // >
      char === 0x3f || // ?
      char === 0x40 || // @
      char === 0x5b || // [
      char === 0x5d || // ]
      char === 0x5c || // \
      char === 0x5e || // ^
      char === 0x60 || // `
      char === 0x7b || // {
      char === 0x7d || // }
      char === 0x7c || // |
      char < 0x21 || // control characters
      char > 0x7e // non-ASCII
    ) {
      // Encode the character
      result += `%${char.toString(16).toUpperCase().padStart(2, "0")}`;
    } else {
      result += str[i];
    }
    i++;
  }

  return result;
}

function isHexDigit(char) {
  return (
    (char >= 0x30 && char <= 0x39) || // 0-9
    (char >= 0x41 && char <= 0x46) || // A-F
    (char >= 0x61 && char <= 0x66) // a-f
  );
}

module.exports = encodeurl;
