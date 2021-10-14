const User = require("../models/User");
exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next()
        }
        try {
            req.user = await User.findById(req.session.user._id)
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login')
    }
    next() // if every is alright you can access it or go where you want to go
}
exports.isUnAuthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/dashboard')
    }
    next() // if every is alright you can access it or go where you want to go
}
