const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const {BASE_DIR, UPLOAD_DIR} = require('./constants')

const isNotDefaultDir = dir => path.parse(dir).base !== 'default'
const utils = {
    rmCategoryDir: id => {
        const categoryDir = path.join(UPLOAD_DIR, id)
        if (BASE_DIR < categoryDir && UPLOAD_DIR < categoryDir) {
            if (isNotDefaultDir(categoryDir)) {
                rimraf(categoryDir, () => true)
            }
        }
    },
    rmGoodsImg: img => {
        if (isNotDefaultDir(img)) {
            const imgPath = path.join(BASE_DIR, img)
            if (imgPath > BASE_DIR || imgPath > UPLOAD_DIR) return
            try {
                fs.unlinkSync(imgPath)
            } catch (e) {

            }
        }
    },
    rmGoodsDir: good => {
        const {goodNumber, category} = good
        const goodsPath = path.join(UPLOAD_DIR, `${category}`, `${goodNumber}`)
        if (goodsPath > BASE_DIR && goodsPath > UPLOAD_DIR) {
            if (path.parse(goodsPath).base !== 'default') {
                rimraf(goodsPath, () => true)
            }
        }
    }
}

module.exports = utils