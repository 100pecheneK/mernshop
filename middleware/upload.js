const fs = require('fs')
const path = require('path')
const multer = require('multer')
const chalk = require('chalk')
const mkdirs = (...dirs) => dirs.forEach(dir => !fs.existsSync(dir) && fs.mkdirSync(dir, err => err && true))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req)
        const category = req.body.category
        const goodNumber = req.body.goodNumber
        const uploadPath = path.join(__dirname, '..', 'uploads')
        const uploadCategoryPath = path.join(uploadPath, category)
        const uploadProductPath = path.join(uploadCategoryPath, goodNumber)
        mkdirs(uploadPath, uploadCategoryPath, uploadProductPath)
        cb(null, `./uploads/${category}/${goodNumber}`)
    },
    filename: function (req, file, cb) {
        const filename = new Date().toISOString() + '_' + file.originalname
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    const category = req.body.category
    const goodNumber = req.body.goodNumber
    if (category && goodNumber) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    } else {
        cb(null, false)
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = upload