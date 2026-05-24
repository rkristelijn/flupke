exports.isStream = (s) => s !== null && typeof s === 'object' && typeof s.pipe === 'function';
exports.isReadableStream = (s) => exports.isStream(s) && typeof s.read === 'function';
exports.isWritableStream = (s) => exports.isStream(s) && typeof s.write === 'function';
