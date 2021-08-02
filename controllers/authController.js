const User = require('../models/User')
const bcrypt = require('bcrypt')
const {validationResult} = require("express-validator");
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGet = (req, res, next) => {
    res.render('pages/auth/signup', {title: 'Create A New Account', error: {}})
}
exports.signupPost = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/auth/signup', {title: 'Create A New Account', error: errors.mapped()})
    }
        try {
            let {username, email, password, confirmPassword} = req.body
            let hashPassword = await bcrypt.hash(password, 11)
            let user = new User({
                username,
                email,
                password: hashPassword
            })
            let createdUser = await user.save()
            console.log('User Created Successfully', createdUser)
            res.render('pages/auth/signup', {title: 'Create A New Account'})
        } catch (e) {

        }

    }

    exports.loginGet = (req, res, next) => {
        res.render('pages/auth/login', {title: 'Login Your Account'})
    }
    exports.loginPost = async (req, res, next) => {
        let {email, password} = req.body
        try {
            let user = await User.findOne({email})
            if (!user) {
                return res.json({
                    message: 'Invalid Credentials'
                })
            }
            let passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                return res.json({
                    message: 'Invalid Credentials'
                })
            }
            console.log('Successfully Logged In', user)
            res.render('pages/auth/login', {title: 'Login Your Account'})


        } catch (e) {

        }
    }
    exports.logout = (req, res, next) => {

    }
