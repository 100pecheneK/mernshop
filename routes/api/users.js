const express = require('express')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const router = express.Router()
const adminOnly = require('../../middleware/adminOnly')

const User = require('../../models/User')

/**
 *  @route POST /api/admin/users
 *  @desc Создание админа или работника
 *  @access Admin
 */
router.post(
    '/',
    [
        adminOnly,
        [
            check('name',
                'Имя обязательно')
                .not().isEmpty(),
            check('email',
                'Пожалуйста, укажите верный Email')
                .isEmail(),
            check('password',
                'Пожалуйста, введите пароль с 6 или более символами')
                .isLength({min: 6})
        ]
    ]
    ,
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {name, email, password, isAdmin} = req.body
        try {
            // See if user exists
            let user = await User.findOne({email})
            if (user) {
                return res.status(400).json({errors: [{msg: 'Пользователь с таким Email уже существует'}]})
            }
            // Build user object
            const userFields = {
                name,
                email
            }
            // Is admin
            if (isAdmin) userFields.isAdmin = true

            // Encrypt password
            const salt = await bcrypt.genSalt(10)
            userFields.password = await bcrypt.hash(password, salt)

            user = new User(userFields)

            await user.save()

            return res.json({msg: 'Пользователь создан'})
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/** @route GET /api/admin/users/list/:page
 * @desc Список работников и админов по 10 на page
 * @access Admin
 */
router.get(
    '/list',
    adminOnly,
    async (req, res) => {
        try {
            const {page, perPage} = req.query
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 5,
                select: '-password',
                sort: {date: -1}
            }
            const users = await User.paginate({}, options)
            return res.json(users)
        } catch
            (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/** @route GET /api/admin/users/:id
 * @desc Просмотр сотрудника или админа
 * @access Admin
 */
router.get(
    '/:id',
    adminOnly,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json({msg: 'Пользователь не найден'})
            }
            return res.json(user)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Пользователь не найден'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/** @route DELETE /api/admin/users/:id
 * @desc Удаление сотрудника или админа
 * @access Admin
 */
router.delete(
    '/:id',
    adminOnly,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json({msg: 'Пользователь не найден'})
            }
            // Remove user
            await user.remove()

            return res.json({msg: 'Пользователь удалён'})
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Пользователь не найден'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

module.exports = router