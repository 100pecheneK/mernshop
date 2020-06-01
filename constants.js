const path = require('path')
const BASE_DIR = __dirname
const UPLOAD_DIR = path.join(BASE_DIR, 'uploads')
module.exports = { BASE_DIR, UPLOAD_DIR }