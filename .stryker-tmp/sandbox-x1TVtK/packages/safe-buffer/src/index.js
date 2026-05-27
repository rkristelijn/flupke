/** @type {typeof Buffer} */
// @ts-nocheck

const SafeBuffer = Buffer;

module.exports = { Buffer: SafeBuffer };
module.exports.Buffer = SafeBuffer;
