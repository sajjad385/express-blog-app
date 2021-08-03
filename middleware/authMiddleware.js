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