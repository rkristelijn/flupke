// @flupkejs/resolve-from
module.exports = function resolveFrom(fromDir, moduleId) { return require.resolve(moduleId, { paths: [fromDir] }); };
module.exports.silent = function (fromDir, moduleId) { try { return require.resolve(moduleId, { paths: [fromDir] }); } catch { return; } };
