/**
 * Merge property descriptors from src to dest.
 * @param {object} dest
 * @param {object} src
 * @param {boolean} [redefine=true]
 * @returns {object} dest
 */
function mergeDescriptors(dest, src, redefine) {
  if (redefine === undefined) redefine = true;
  const names = Object.getOwnPropertyNames(src);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (!redefine && Object.hasOwn(dest, name)) continue;
    const descriptor = Object.getOwnPropertyDescriptor(src, name);
    Object.defineProperty(dest, name, descriptor);
  }
  return dest;
}

module.exports = mergeDescriptors;
