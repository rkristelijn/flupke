module.exports = function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };
module.exports.reject = function (ms, err) { return new Promise((_, reject) => setTimeout(() => reject(err || new Error('delay rejected')), ms)); };
