module.exports = function camelCase(str) { return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : ''); };
