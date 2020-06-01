const express = require('express')
const {check, body, validationResult} = require('express-validator')
const config = require('config')
const router = express.Router()
const auth = require('../../middleware/auth')
const Good = require('../../models/Good')
const Category = require('../../models/Category')
const upload = require('../../middleware/upload')
const utils = require('../../utils')
const chalk = require('chalk')
const makeGoodFields = req => {
    const {category, name, description, price, salePrice, goodNumber} = req.body
    const images = req.files

    const goodFields = {}
    if (category) goodFields.category = category
    if (name) goodFields.name = name
    if (description) goodFields.description = description
    if (price >= 0) goodFields.price = price
    if (salePrice) goodFields.salePrice = salePrice
    if (goodNumber) goodFields.goodNumber = goodNumber
    if (images) goodFields.images = images.map(img => img.path)
    return goodFields
}


/**
 *  @route POST /api/admin/adminGoods
 *  @desc Создание товаров
 *  @access auth
 */
router.post(
    '/',
    [
        auth,
        upload.array('images'),
        [
            check('category', 'Категория обязательна').not().isEmpty(),
            check('name', 'Название обязательно').not().isEmpty(),
            check('description', 'Описание обязательно').not().isEmpty(),
            check('price', 'Цена обязательна').not().isEmpty(),
            check('goodNumber', 'Код товара обязателен').not().isEmpty()
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            if (!await Category.findById(req.body.category)) {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            if (await Good.findOne({goodNumber: req.body.goodNumber})) {
                return res.status(400).json({msg: 'Код товара должен быть уникальным'})
            }
            const goodFields = makeGoodFields(req)
            let good = new Good(goodFields)
            await good.save()
            good = await Good.findById(good.id).populate({path: 'category', select: 'name'})

            return res.json(good)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route PATCH /api/admin/adminGoods/:id
 *  @desc Изменение товара по id
 *  @access auth
 */
router.patch(
    '/:id',
    [
        auth,
        upload.array('images'),
        [
            check('category', 'Категория обязательна').not().isEmpty(),
            check('name', 'Название обязательно').not().isEmpty(),
            check('description', 'Описание обязательно').not().isEmpty(),
            check('price', 'Цена обязательна').not().isEmpty(),
            check('goodNumber', 'Код товара обязателен').not().isEmpty()
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            if (!await Category.findById(req.body.category)) {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            let good = await Good.findById(req.params.id)
            if (!good) {
                return res.status(404).json({msg: 'Товар не найден'})
            }

            const goodWithTheSameNumber = await Good.findOne({goodNumbed: req.body.goodNumber})

            if (goodWithTheSameNumber && good.id !== goodWithTheSameNumber.id) {
                return res.status(404).json({msg: 'Код товара должен быть уникальным'})
            }
            // Удалить лишние фото
            good.images.forEach(utils.rmGoodsImg)

            const goodFields = makeGoodFields(req)
            await Good.findByIdAndUpdate(
                {_id: req.params.id},
                {$set: goodFields})

            good = await Good.findById(req.params.id).populate({path: 'category', select: 'name'})

            return res.json(good)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route DELETE /api/admin/adminGoods/id
 *  @desc Удаление товара по id
 *  @access auth
 */
router.delete(
    '/:id',
    async (req, res) => {
        try {
            const good = await Good.findById(req.params.id)
            if (!good) {
                return res.status(404).json({msg: 'Товар не найден'})
            }
            utils.rmGoodsDir(good)
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


/**
 *  @route GET /api/admin/adminGoods
 *  @desc Просмотр товаров
 *  @access auth
 */
router.get(
    '/',
    async (req, res) => {
        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || config.get('goodPerPage'),
                populate: {path: 'category', select: 'name'}
            }
            const goods = await Good.paginate({}, options)

            return res.json(goods)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route GET /api/admin/adminGoods/:id
 *  @desc Просмотр товара по id
 *  @access auth
 */
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

module.exports = router