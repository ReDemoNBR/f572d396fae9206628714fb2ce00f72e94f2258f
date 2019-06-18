const {createHash} = require("crypto");

module.exports = value => createHash("sha3-512").update(value).digest("hex");