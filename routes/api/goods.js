const express = require('express')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const router = express.Router()
const adminOnly = require('../../middleware/adminOnly')
const fs = require('fs')
const path = require('path')
const auth = require('../../middleware/auth')
const Good = require('../../models/Good')
const chalk = require('chalk')
const upload = require('../../middleware/upload')
const rimraf = require('rimraf')
const {BASE_DIR} = require('../../constants')

const makeGoodFields = req => {
    const {category, name, description, price, salePrice, goodNumber} = req.body
    const images = req.files
    const goodFields = {}
    if (category) goodFields.category = category
    if (name) goodFields.name = name
    if (description) goodFields.description = description
    if (price) goodFields.price = price
    if (salePrice) goodFields.salePrice = salePrice
    if (goodNumber) goodFields.goodNumber = goodNumber
    if (images) goodFields.images = images
    return goodFields
}
router.get(
    '/',
    async (req, res) => {
        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || config.get('goodPerPage'),
            }
            const goods = await Good.paginate({}, options)

            return res.json(goods)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

router.get(
    '/:id',
    async (req, res) => {
        try {
            const good = await Good.findById(req.params.id)
            if (!good) {
                return res.status(404).json({msg: 'Товар не найден'})
            }
            return res.json(good)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Товар не найден'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })
//TODO: Добавить проверку на существование категории
router.post(
    '/',
    [
        auth,
        [
            check('category', 'Категория обязательна').not().isEmpty(),
            check('name', 'Название обязательно').not().isEmpty(),
            check('description', 'Описание обязательно').not().isEmpty(),
            check('price', 'Цена обязательна').not().isEmpty(),
            check('goodNumber', 'Код товара обязателен').not().isEmpty(),
        ],
        upload.array('images')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            let good = await Good.findOne({goodNumber: req.body.goodNumber})
            if (good) {
                return res.status(400).json({msg: 'Код товара должен быть уникальным'})
            }
            const goodFields = makeGoodFields(req)
            good = new Good(goodFields)
            await good.save()

            return res.json(good)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })
//TODO: Добавить проверку на существование категории
router.patch(
    '/:id',
    [
        auth,
        [
            check('category', 'Категория обязательна').not().isEmpty(),
            check('name', 'Название обязательно').not().isEmpty(),
            check('description', 'Описание обязательно').not().isEmpty(),
            check('price', 'Цена обязательна').not().isEmpty(),
            check('goodNumber', 'Код товара обязателен').not().isEmpty(),
        ],
        upload.array('images')
    ],
    async (req, res) => {
        try {
            let good = await Good.findById(req.params.id)
            if (!good) {
                return res.status(404).json({msg: 'Товар не найден'})
            }

            const goodWithSimilarNumber = await Good.findOne({goodNumbed: req.body.goodNumber})

            if (goodWithSimilarNumber && good.id !== goodWithSimilarNumber.id) {
                return res.status(404).json({msg: 'Код товара должен быть уникальным'})
            }
            // Удалить лишние фото
            good.images.forEach(img => {
                if (path.basename(img) === 'default') {
                    return
                }
                const imgPath = path.join(BASE_DIR, img)
                if (imgPath === BASE_DIR) return
                try {
                    console.log('delete: ', imgPath)
                    // fs.unlinkSync(imgPath)
                } catch (e) {

                }
            })

            const goodFields = makeGoodFields(req)
            await Good.findByIdAndUpdate(
                {_id: req.params.id},
                {$set: goodFields})

            good = await Good.findById(req.params.id)

            return res.json(good)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

router.delete(
    '/:id',
    async (req, res) => {
        try {
            const good = await Good.findById(req.params.id)
            if (!good) {
                return res.status(404).json({msg: 'Товар не найден'})
            }
            if (good.images) {
                const goodImgsPath = path.dirname(path.join(BASE_DIR, good.images[0]))
                if (goodImgsPath !== BASE_DIR) {
                    if (!path.parse(goodImgsPath).base !== 'default') {
                        console.log('delete: ', goodImgsPath)
                        // rimraf(goodImgsPath, () => true)
                    }
                }
            }
            good.remove()

            return res.json({msg: 'Товар удалён'})
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Товар не найден'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

module.exports = router