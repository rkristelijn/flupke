const crypto = require("node:crypto");
module.exports = {
  generateId: () => crypto.randomBytes(12).toString("base64"),
};
