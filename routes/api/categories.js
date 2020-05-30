const express = require('express')
const request = require('request')
const config = require('config')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const Good = require('../../models/Good')
const Category = require('../../models/Category')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const {BASE_DIR} = require('../../constants')

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
            res.status(500).send('Ошибка сервера')
        }
    })

router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const category = Category.findById(req.params.id)
            if (!category) {
                return res.status(400).json({msg: 'Категория не найдена'})
            }

            await Goos.deleteMany({category: req.params.id})

            const goodImgsPath = path.dirname(path.join(UPLOAD_PATH, 'uploads', category.name))
            if (BASE_DIR !== goodImgsPath) {
                if (!path.parse(goodImgsPath).base !== 'default') {
                    console.log('delete: ', goodImgsPath)

                    // rimraf(goodImgsPath, () => true)
                }
            }

            await category.remove()


            return res.json({msg: 'Категория удалёна'})
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })
module.exports = router
