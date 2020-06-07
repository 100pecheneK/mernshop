const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const adminOnly = require('../../middleware/adminOnly')
const Settings = require('../../models/Settings')
const fs = require('fs')
const path = require('path')
const {v4: uuidv4} = require('uuid')
const multer = require('multer')
const {UPLOAD_DIR} = require('../../constants')
/**
 *  @route GET /api/admin/settings
 *  @desc Просмотр настроек
 *  @access public
 */
router.get(
    '/',
    async (req, res) => {
        try {
            const settings = await Settings.findOne({$query: {}, $orderby: {_id: -1}})
            return res.json(settings)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

const getSettingsFields = req => {
    const {
        shotTitle,
        title,
        image1_text,
        image2_text,
        contactUs,
        contactUs_text,
        image3_text,
        about,
        youtube,
        twitter,
        facebook,
        instagram,
        vkontakte,
        advantage1,
        advantage1_text,
        icon1,
        advantage2,
        advantage2_text,
        icon2,
        advantage3,
        advantage3_text,
        icon3,
    } = req.body
    const image1 = req.files['image1']
    const image2 = req.files['image2']
    const image3 = req.files['image3']
    const settingsFields = {}
    if (shotTitle) settingsFields.shotTitle = shotTitle

    if (title) settingsFields.title = title

    if (image1) settingsFields.image1 = image1[0].path
    if (image1_text) settingsFields.image1_text = image1_text

    settingsFields.advantages = {}
    if (advantage1) settingsFields.advantages.advantage1 = advantage1
    if (advantage1_text) settingsFields.advantages.advantage1_text = advantage1_text
    if (icon1) settingsFields.advantages.icon1 = icon1
    if (advantage2) settingsFields.advantages.advantage2 = advantage2
    if (advantage2_text) settingsFields.advantages.advantage2_text = advantage2_text
    if (icon2) settingsFields.advantages.icon2 = icon2
    if (advantage3) settingsFields.advantages.advantage3 = advantage3
    if (advantage3_text) settingsFields.advantages.advantage3_text = advantage3_text
    if (icon3) settingsFields.advantages.icon3 = icon3

    if (image2) settingsFields.image2 = image2[0].path
    if (image2_text) settingsFields.image2_text = image2_text

    if (contactUs) settingsFields.contactUs = contactUs
    if (contactUs_text) settingsFields.contactUs_text = contactUs_text

    if (image3) settingsFields.image3 = image3[0].path
    if (image3_text) settingsFields.image3_text = image3_text

    if (about) settingsFields.about = about

    settingsFields.links = {}
    if (youtube) settingsFields.links.youtube = youtube
    if (twitter) settingsFields.links.twitter = twitter
    if (facebook) settingsFields.links.facebook = facebook
    if (instagram) settingsFields.links.instagram = instagram
    if (vkontakte) settingsFields.links.vkontakte = vkontakte

    return settingsFields
}
const mkdirs = (...dirs) => dirs.forEach(dir => !fs.existsSync(dir) && fs.mkdirSync(dir, err => err && true))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadSettingsPath = path.join(UPLOAD_DIR, 'settings')
        mkdirs(UPLOAD_DIR, uploadSettingsPath)
        cb(null, `./uploads/settings`)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const filename = new Date().toISOString() + uuidv4() + ext
        console.log(filename)
        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})


/**
 *  @route POST /api/admin/settings
 *  @desc Создание или изменение настроек
 *  @access admin
 */
router.post(
    '/',
    [
        adminOnly,
        upload.fields([
            {name: 'image1', maxCount: 1},
            {name: 'image2', maxCount: 1},
            {name: 'image3', maxCount: 1},

        ]),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            let settings = await Settings.findOne({$query: {}})
            if (settings) {
                //    update
                const settingsFields = getSettingsFields(req)
                if (!settingsFields.image1)
                    settingsFields.image1 = settings.image1
                if (!settingsFields.image2)
                    settingsFields.image2 = settings.image2
                if (!settingsFields.image3)
                    settingsFields.image3 = settings.image3
                await Settings.findOneAndReplace(
                    {_id: settings.id},
                    settingsFields)
                settings = await Settings.findOne({$query: {}})
            } else {
                //    create
                const settingsFields = getSettingsFields(req)
                settings = new Settings(settingsFields)
                await settings.save()
            }

            return res.json(settings)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })


module.exports = router
