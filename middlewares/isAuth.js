module.exports = {
    isAuthCHAT: (req, res, next) => {
        if (req.session.isAuth) {
            next()
        } else {
            res.redirect('/')
        }
    },
    isAuthUSER: (req, res, next) => {
        if (req.session.isAuth) {
            res.redirect('/chat')
        } else {
            next()
        }
    }
}