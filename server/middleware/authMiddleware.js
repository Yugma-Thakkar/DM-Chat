const User = require('../models/userSchema')

const authMiddleware = async (req, res, next) => {
    const cookie = req.cookies.session
    if (cookie) {
        const user = await User.findOne({cookie})
        if (user) {
            req.user = user
            next()
        } else {
            res.json({status: 'FAIL', error: `USER NOT FOUND`})
        }
    }
    else {
        res.json({status: 'FAIL', error: `COOKIE NOT FOUND`})
    }
}

module.exports = authMiddleware