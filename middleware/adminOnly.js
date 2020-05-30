const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if not token
    if (!token) {
        return res.status(401).json({msg: 'Нет токена, авторизация отклонена'})
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        const user = await User.findById(decoded.user.id)
        if (!user.isAdmin){
            return res.status(401).json({msg: 'Нет прав'})
        }

        req.user = decoded.user
        next()
    } catch (e) {
        return res.status(401).json({msg: 'Токен неверный'})
    }
}
