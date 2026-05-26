const intrinsics = {
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer !== "undefined" ? ArrayBuffer : undefined,
  "%ArrayIteratorPrototype%":
    typeof Array !== "undefined"
      ? Array.prototype[Symbol.iterator]?.prototype
      : undefined,
  "%AsyncFromSyncIteratorPrototype%": undefined,
  "%AsyncFunction%": (async () => {}).constructor,
  "%AsyncGenerator%": async function* () {}.constructor,
  "%AsyncGeneratorFunction%": async function* () {}.constructor.prototype
    ?.constructor,
  "%AsyncIteratorPrototype%": async function* () {}[Symbol.asyncIterator]
    ?.prototype,
  "%Atomics%": typeof Atomics !== "undefined" ? Atomics : undefined,
  "%BigInt%": typeof BigInt !== "undefined" ? BigInt : undefined,
  "%BigInt64Array%":
    typeof BigInt64Array !== "undefined" ? BigInt64Array : undefined,
  "%BigUint64Array%":
    typeof BigUint64Array !== "undefined" ? BigUint64Array : undefined,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView !== "undefined" ? DataView : undefined,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": undefined, // intentionally disabled for security
  "%EvalError%": EvalError,
  "%Float32Array%":
    typeof Float32Array !== "undefined" ? Float32Array : undefined,
  "%Float64Array%":
    typeof Float64Array !== "undefined" ? Float64Array : undefined,
  "%Function%": Function,
  "%Generator%": function* () {}.constructor,
  "%GeneratorFunction%": function* () {}.constructor.prototype?.constructor,
  "%Int8Array%": typeof Int8Array !== "undefined" ? Int8Array : undefined,
  "%Int16Array%": typeof Int16Array !== "undefined" ? Int16Array : undefined,
  "%Int32Array%": typeof Int32Array !== "undefined" ? Int32Array : undefined,
  "%isFinite%": Number.isFinite,
  "%isNaN%": Number.isNaN,
  "%IteratorPrototype%": (function* () {})()[Symbol.iterator]?.prototype,
  "%JSON%": JSON,
  "%Map%": typeof Map !== "undefined" ? Map : undefined,
  "%MapIteratorPrototype%":
    typeof Map !== "undefined"
      ? Map.prototype[Symbol.iterator]?.prototype
      : undefined,
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%ObjProto_toString%": Object.prototype.toString,
  "%Promise%": typeof Promise !== "undefined" ? Promise : undefined,
  "%Proxy%": typeof Proxy !== "undefined" ? Proxy : undefined,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect !== "undefined" ? Reflect : undefined,
  "%RegExp%": RegExp,
  "%Set%": typeof Set !== "undefined" ? Set : undefined,
  "%SetIteratorPrototype%":
    typeof Set !== "undefined"
      ? Set.prototype[Symbol.iterator]?.prototype
      : undefined,
  "%SharedArrayBuffer%":
    typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : undefined,
  "%String%": String,
  "%StringIteratorPrototype%": String.prototype[Symbol.iterator]?.prototype,
  "%Symbol%": typeof Symbol !== "undefined" ? Symbol : undefined,
  "%SyntaxError%": SyntaxError,
  "%ThrowTypeError%": (() => () => {
    void arguments.callee.caller;
  })().constructor,
  "%TypedArray%": typeof TypedArray !== "undefined" ? TypedArray : undefined,
  "%TypeError%": TypeError,
  "%Uint8Array%": typeof Uint8Array !== "undefined" ? Uint8Array : undefined,
  "%Uint8ClampedArray%":
    typeof Uint8ClampedArray !== "undefined" ? Uint8ClampedArray : undefined,
  "%Uint16Array%": typeof Uint16Array !== "undefined" ? Uint16Array : undefined,
  "%Uint32Array%": typeof Uint32Array !== "undefined" ? Uint32Array : undefined,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap !== "undefined" ? WeakMap : undefined,
  "%WeakSet%": typeof WeakSet !== "undefined" ? WeakSet : undefined,
};
module.exports = function getIntrinsic(name) {
  if (name in intrinsics) return intrinsics[name];
  // Support dot-notation: %Object.defineProperty%
  const match = name.match(/^%([^.%]+)\.([^%]+)%$/);
  if (match) {
    const base = intrinsics[`%${match[1]}%`];
    if (base) return base[match[2]];
  }
  throw new TypeError(`Intrinsic not found: ${name}`);
};
