// @ts-nocheck
// Common MIME types database
const MIME_TYPES = {
  ".3gp": "video/3gpp",
  ".3gpp": "video/3gpp",
  ".7z": "application/x-7z-compressed",
  ".aac": "audio/aac",
  ".abw": "application/x-abiword",
  ".ai": "application/postscript",
  ".aif": "audio/x-aiff",
  ".aiff": "audio/x-aiff",
  ".appcache": "text/cache-manifest",
  ".asc": "application/pgp-signature",
  ".asf": "video/x-ms-asf",
  ".asm": "text/x-asm",
  ".atom": "application/atom+xml",
  ".au": "audio/basic",
  ".avi": "video/x-msvideo",
  ".bmp": "image/bmp",
  ".bz2": "application/x-bzip2",
  ".c": "text/x-c",
  ".cab": "application/vnd.ms-cab-compressed",
  ".cc": "text/x-c",
  ".chm": "application/x-chm",
  ".class": "application/java",
  ".cmake": "text/x-cmake",
  ".conf": "text/plain",
  ".cpp": "text/x-c++",
  ".crt": "application/x-x509-ca-cert",
  ".css": "text/css",
  ".csv": "text/csv",
  ".cxx": "text/x-c++",
  ".dart": "application/dart",
  ".db": "application/x-sqlite3",
  ".dmg": "application/x-apple-diskimage",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".dot": "application/msword",
  ".dotx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  ".dll": "application/x-msdownload",
  ".ear": "application/java-archive",
  ".ejs": "text/html",
  ".eot": "application/vnd.ms-fontobject",
  ".eps": "application/postscript",
  ".exe": "application/x-msdownload",
  ".f4v": "video/mp4",
  ".f77": "text/x-fortran",
  ".f90": "text/x-fortran",
  ".f95": "text/x-fortran",
  ".flac": "audio/flac",
  ".flv": "video/x-flv",
  ".gif": "image/gif",
  ".gz": "application/gzip",
  ".gzip": "application/gzip",
  ".h": "text/x-c",
  ".h++": "text/x-c++",
  ".hpp": "text/x-c++",
  ".hxx": "text/x-c++",
  ".h264": "video/h264",
  ".h265": "video/h265",
  ".htm": "text/html",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".ics": "text/calendar",
  ".ifb": "text/calendar",
  ".img": "application/x-raw-disk-image",
  ".ini": "text/plain",
  ".iso": "application/x-iso9660-image",
  ".jade": "text/jade",
  ".jar": "application/java-archive",
  ".java": "text/x-java",
  ".jinja": "text/jinja",
  ".jinja2": "text/jinja",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript",
  ".json": "application/json",
  ".jsonld": "application/ld+json",
  ".jsx": "text/jsx",
  ".key": "application/pkcs8",
  ".keystore": "application/x-java-keystore",
  ".less": "text/less",
  ".lha": "application/x-lzh-compressed",
  ".lhs": "text/x-literate-haskell",
  ".lib": "application/x-msdownload",
  ".log": "text/plain",
  ".lua": "text/x-lua",
  ".lz4": "application/x-lz4",
  ".lzh": "application/x-lzh-compressed",
  ".lzma": "application/x-lzma",
  ".m3u": "audio/x-mpegurl",
  ".m3u8": "audio/x-mpegurl",
  ".m4a": "audio/mp4",
  ".m4v": "video/mp4",
  ".markdown": "text/markdown",
  ".md": "text/markdown",
  ".mdb": "application/x-msaccess",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".mjs": "application/javascript",
  ".mkd": "text/markdown",
  ".mkv": "video/x-matroska",
  ".ml": "text/x-ocaml",
  ".mli": "text/x-ocaml",
  ".mm": "text/x-objc",
  ".mng": "video/x-mng",
  ".mo": "application/x-gettext-translation",
  ".mobi": "application/x-mobipocket-ebook",
  ".mod": "audio/x-mod",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".mp4a": "audio/mp4",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".mpkg": "application/vnd.apple.installer+xml",
  ".msi": "application/x-msdownload",
  ".msm": "application/x-msdownload",
  ".msp": "application/x-msdownload",
  ".mustache": "text/html",
  ".nix": "text/x-nix",
  ".npx": "application/x-npm",
  ".o": "application/x-object",
  ".obj": "application/x-object",
  ".ogg": "audio/ogg",
  ".ogv": "video/ogg",
  ".otf": "font/otf",
  ".p12": "application/x-pkcs12",
  ".pac": "application/x-ns-proxy-autoconfig",
  ".pae": "application/x-lzh-compressed",
  ".pas": "text/x-pascal",
  ".pdb": "application/x-pdb",
  ".pdf": "application/pdf",
  ".pem": "application/x-x509-ca-cert",
  ".pfx": "application/x-pkcs12",
  ".pgm": "image/x-portable-graymap",
  ".php": "text/x-php",
  ".pic": "image/x-pict",
  ".pict": "image/x-pict",
  ".pkg": "application/x-newton-compatible-pkg",
  ".pl": "text/x-perl",
  ".pm": "text/x-perl",
  ".png": "image/png",
  ".pnm": "image/x-portable-anymap",
  ".pod": "text/x-perl",
  ".ppm": "image/x-portable-pixmap",
  ".pps": "application/vnd.ms-powerpoint",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".prf": "application/pics-rules",
  ".ps": "application/postscript",
  ".psd": "image/vnd.adobe.photoshop",
  ".py": "text/x-python",
  ".pyw": "text/x-python",
  ".qt": "video/quicktime",
  ".ra": "audio/x-realaudio",
  ".ram": "audio/x-pn-realaudio",
  ".rar": "application/x-rar-compressed",
  ".ras": "image/x-cmu-raster",
  ".rb": "text/x-ruby",
  ".rdf": "application/rdf+xml",
  ".rhtml": "text/html",
  ".rm": "application/vnd.rn-realmedia",
  ".rmvb": "application/vnd.rn-realmedia-vbr",
  ".rpm": "application/x-rpm",
  ".rss": "application/rss+xml",
  ".rtf": "application/rtf",
  ".s": "text/x-asm",
  ".sass": "text/x-sass",
  ".scala": "text/x-scala",
  ".scm": "text/x-scheme",
  ".scss": "text/x-scss",
  ".sed": "text/x-script",
  ".sh": "application/x-sh",
  ".sig": "application/pgp-signature",
  ".slim": "text/html",
  ".sln": "text/plain",
  ".so": "application/x-sharedlib",
  ".sql": "application/x-sql",
  ".srt": "application/x-subtitle",
  ".ss": "text/x-scheme",
  ".svg": "image/svg+xml",
  ".svgz": "image/svg+xml",
  ".swf": "application/x-shockwave-flash",
  ".swift": "text/x-swift",
  ".tar": "application/x-tar",
  ".tbz": "application/x-bzip-compressed-tar",
  ".tbz2": "application/x-bzip-compressed-tar",
  ".tcl": "application/x-tcl",
  ".tex": "text/x-tex",
  ".texi": "text/x-texinfo",
  ".texinfo": "text/x-texinfo",
  ".tgz": "application/x-tgz",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".tm": "text/typescript",
  ".torrent": "application/x-bittorrent",
  ".tr": "text/x-script",
  ".ts": "video/mp2t",
  ".tsx": "text/typescript",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".txz": "application/x-tarz",
  ".vb": "text/x-visualbasic",
  ".vbs": "text/vbscript",
  ".war": "application/java-archive",
  ".wasm": "application/wasm",
  ".wav": "audio/wav",
  ".wax": "audio/x-ms-wax",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".wma": "audio/x-ms-wma",
  ".wmv": "video/x-ms-wmv",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".wsdl": "application/wsdl+xml",
  ".xhtml": "application/xhtml+xml",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xml": "application/xml",
  ".xpm": "image/x-xpixmap",
  ".xps": "application/vnd.ms-xpsdocument",
  ".xsd": "application/xml",
  ".xsl": "application/xml",
  ".xslt": "application/xslt+xml",
  ".yaml": "text/yaml",
  ".yml": "text/yaml",
  ".zip": "application/zip",
};

// Reverse lookup for extension (first extension for each MIME type)
const EXTENSIONS = {};
for (const [ext, mime] of Object.entries(MIME_TYPES)) {
  if (!(mime in EXTENSIONS)) {
    EXTENSIONS[mime] = ext;
  }
}

/**
 * Get MIME type for file extension.
 * @param {string} path - File path or extension
 * @returns {string|false} MIME type or false
 */
function lookup(path) {
  if (!path) {
    return false;
  }
  const ext = path.includes(".")
    ? path.substring(path.lastIndexOf(".")).toLowerCase()
    : `.${path}`;
  return MIME_TYPES[ext] || false;
}

/**
 * Get full content-type with charset.
 * @param {string} type - MIME type
 * @returns {string} Full content-type
 */
function contentType(type) {
  if (!type) {
    return false;
  }
  const mime = type.includes("/") ? type : lookup(type);
  if (!mime) {
    return type;
  }
  if (
    mime.startsWith("text/") ||
    mime === "application/javascript" ||
    mime === "application/json"
  ) {
    return `${mime}; charset=utf-8`;
  }
  return mime;
}

/**
 * Get extension for MIME type.
 * @param {string} type - MIME type
 * @returns {string|false} Extension or false
 */
function extension(type) {
  if (!type) {
    return false;
  }
  // Find the first extension that maps to this type
  for (const [ext, mime] of Object.entries(MIME_TYPES)) {
    if (mime === type) {
      return ext;
    }
  }
  return false;
}

module.exports = { lookup, contentType, extension };
module.exports.types = MIME_TYPES;
module.exports.extensions = EXTENSIONS;
