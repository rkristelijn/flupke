/**
 * Check if a response is fresh based on request headers.
 * @param {Object} reqHeaders - Request headers object
 * @param {Object} resHeaders - Response headers object
 * @returns {boolean} True if response is fresh
 */
function fresh(reqHeaders, resHeaders) {
  const method = (reqHeaders.method || "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    return false;
  }

  const ifNoneMatch = reqHeaders["if-none-match"];
  const ifModifiedSince = reqHeaders["if-modified-since"];

  // If both are missing, response is not fresh
  if (!ifNoneMatch && !ifModifiedSince) {
    return false;
  }

  // Check ETag first
  if (ifNoneMatch) {
    const etag = resHeaders.etag;
    if (etag) {
      // Handle multiple ETags in If-None-Match
      const clientETags = ifNoneMatch.split(",").map((e) => e.trim());
      const serverETag = etag.replace(/^W\//, "").replace(/"/g, "");

      for (const clientETag of clientETags) {
        const normalizedClientETag = clientETag
          .replace(/^W\//, "")
          .replaceAll('"', "");
        if (normalizedClientETag === serverETag) {
          return true;
        }
      }
    }
  }

  // Check Last-Modified
  if (ifModifiedSince) {
    const lastModified = resHeaders["last-modified"];
    if (lastModified) {
      const clientDate = new Date(ifModifiedSince);
      const serverDate = new Date(lastModified);
      if (
        !Number.isNaN(clientDate) &&
        !Number.isNaN(serverDate) &&
        serverDate <= clientDate
      ) {
        return true;
      }
    }
  }

  return false;
}

module.exports = fresh;
