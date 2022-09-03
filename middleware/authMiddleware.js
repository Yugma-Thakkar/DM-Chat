const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const isAuth = async(req, res, next) => {
    // let token

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     try {
    //         token = req.headers.authorization.split(' ')[1]
    //         const decoded = jwt.verify(token, process.env.SESSION_SECRET)
    //         req.user = await User.findById(decoded.id).select('-password')
    //         next()
    //     } catch (error) {
    //         console.error(error)
    //         res.json({status: 'AUTH FAIL'})
    //     }
    // }

    // if(!token) {
    //     res.json({status: 'AUTH FAIL, NO TOKEN'})
    // }

    //getting token from header
    const token = req.header('x-auth-token')

    //check if token exists
    if (!token) return res.status(401).json({status: 'AUTH FAIL, NO TOKEN'})

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.SESSION_SECRET)

        //check if token is valid
        if (!decoded) return res.status(401).json({status: 'AUTH FAIL, NO DECODED'})

        //add user from payload
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.error(error)
        res.json({status: 'AUTH FAIL'})
    }
}

module.exports = isAuth