const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const isAuth = async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            // res.json({status: 'AUTHENTICATED', message: `USER ${req.user.username} AUTHENTICATED`, user: req.user})
            next()
        } catch (error) {
            res.json({status: 'AUTH FAIL', error: `${error.message}`})
        }
    }

    if(!token) {
        return res.json({status: 'AUTH FAIL', error: `NO TOKEN`})
    }
}

module.exports = isAuth