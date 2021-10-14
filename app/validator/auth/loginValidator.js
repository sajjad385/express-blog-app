const {body} = require("express-validator");
const User = require("../../models/User");
module.exports = [
    body('email')
        .not().isEmpty().withMessage('Email can not be empty')
        .custom(async email => {
            let user = await User.findOne({email})
            if (!user) {
                return Promise.reject('Invalid Credentials')
            }
        }),
    body('password')
        .not().isEmpty().withMessage('Password can not be empty')
]