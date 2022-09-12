const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const isAuth = async(req, res, next) => {
    let accessToken

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            accessToken = req.headers.authorization.split(' ')[1]
            const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET)
            // console.log(decoded)
            req.user = await User.findById(decoded.id.id).select('-password')
            // res.json({status: 'AUTHENTICATED', message: `USER ${req.user.username} AUTHENTICATED`, user: req.user})
            next()
        } catch (error) {
            res.json({status: 'AUTH FAIL', error: `${error.message}`})
        }
    }

    if(!accessToken) {
        return res.json({status: 'AUTH FAIL', error: `NO ACCESS TOKEN`})
    }
}

module.exports = isAuth