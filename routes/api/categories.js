const express = require('express')
const config = require('config')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const Good = require('../../models/Good')
const Category = require('../../models/Category')
const utils = require('../../utils')

/**
 *  @route GET /api/admin/categories
 *  @desc Просмотр категорий
 *  @access auth
 */
router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || config.get('categoryPerPage'),
            }
            const category = await Category.paginate({}, options)
            return res.json(category)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route POST /api/admin/goods
 *  @desc Создание категории
 *  @access auth
 */
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Название обязательно').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const category = new Category({
                name: req.body.name
            })
            await category.save()
            return res.json(category)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route GET /api/admin/categories/id
 *  @desc Просмотр категории по id
 *  @access auth
 */
router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const category = await Category.findById(req.params.id)
            if (!category) {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            return res.json(category)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route PATCH /api/admin/categories/id
 *  @desc Изменение категории по id
 *  @access auth
 */
router.patch(
    '/:id',
    [
        auth,
        [
            check('name', 'Название обязательно').not().isEmpty()
        ]
    ],
    async (req, res) => {
        try {
            const categoryFields = {
                name: req.body.name
            }
            await Category.findByIdAndUpdate(
                {_id: req.params.id},
                {$set: categoryFields})
            const category = await Category.findById(req.params.id)
            return res.json(category)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/**
 *  @route DELETE /api/admin/categories/id
 *  @desc Удаление категории по id
 *  @access auth
 */
router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const category = await Category.findById(req.params.id)
            if (!category) {
                return res.status(400).json({msg: 'Категория не найдена'})
            }

            await Good.deleteMany({category: req.params.id})

            utils.rmCategoryDir(category.id)


            await category.remove()


            return res.json({msg: 'Категория удалёна'})
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Категория не найдена'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })
module.exports = router
