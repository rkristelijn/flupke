const url = require("node:url");

/**
 * Parse URL from request object with caching.
 * @param {Object} req - HTTP request object
 * @returns {Object|undefined} Parsed URL object
 */
function parseurl(req) {
  if (!req || !req.url) {
    return undefined;
  }

  // Check cache
  if (req._parsedUrl && req._parsedUrl.href === req.url) {
    return req._parsedUrl;
  }

  const parsed = url.parse(req.url);
  req._parsedUrl = parsed;
  return parsed;
}

/**
 * Parse original URL from request object with caching.
 * @param {Object} req - HTTP request object
 * @returns {Object|undefined} Parsed URL object
 */
parseurl.original = (req) => {
  if (!req || !req.originalUrl) {
    return undefined;
  }

  // Check cache
  if (
    req._parsedOriginalUrl &&
    req._parsedOriginalUrl.href === req.originalUrl
  ) {
    return req._parsedOriginalUrl;
  }

  const parsed = url.parse(req.originalUrl);
  req._parsedOriginalUrl = parsed;
  return parsed;
};

module.exports = parseurl;
