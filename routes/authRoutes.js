const {signupGet, signupPost, loginGet, loginPost, logout} = require("../controllers/authController");
const authRoutes = require('express').Router()
const {body} = require('express-validator')
const User = require("../models/User");

const signupValidator = [
    body('username')
        .isLength({min: 3, max: 15})
        .withMessage('Username must be between 3 to 15 characters')
        .custom(async username => {
            let user = await User.findOne({username})
            if (user) {
                return Promise.reject('Username already used')
            }
        }).trim(),
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .custom(async email => {
            let user = await User.findOne({email})
            if (user) {
                return Promise.reject('Email already Used')
            }
        }).normalizeEmail(),
    body('password')
        .isLength({min: 5}).withMessage('Password must be greater than 5 characters'),
    body('confirmPassword')
        .isLength({min: 5}).withMessage('Confirm Password must be greater than 5 characters')
        .custom((confirmPassword, {req}) => {
            if (confirmPassword !== req.body.password) {
                throw new Error(`Password Doesn't match!`)
            }
            return true
        })
]

authRoutes.get('/signup', signupGet)
authRoutes.post('/signup', signupValidator, signupPost)
authRoutes.get('/login', loginGet)
authRoutes.post('/login', loginPost)
authRoutes.post('/logout', logout)

module.exports = authRoutes