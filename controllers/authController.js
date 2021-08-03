const User = require('../models/User')
const bcrypt = require('bcrypt')
const {validationResult, body} = require("express-validator");
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGet = (req, res, next) => {
    res.render('pages/auth/signup',
        {
            title: 'Create A New Account',
            error: {},
            existingValue: {}
        })
}
exports.signupPost = async (req, res, next) => {
    let {username, email, password, confirmPassword} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/auth/signup', {
            title: 'Create A New Account',
            error: errors.mapped(),
            existingValue: {
                username, email, password
            }
        })
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
        res.render('pages/auth/signup', {title: 'Create A New Account',error:{},existingValue:{}})
    } catch (e) {

    }

}

exports.loginGet = (req, res, next) => {
    res.render('pages/auth/login', {title: 'Login Your Account', error: {}, existingValue: {}})
}
exports.loginPost = async (req, res, next) => {
    let {email, password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/auth/login', {
            title: 'Login Your Account',
            error: errors.mapped(),
            existingValue: {email}
        })
    }
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
        // res.setHeader('Set-Cookie','isLoggedIn=true')
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            return res.redirect('/dashboard')
        })
        // res.render('pages/auth/login', {title: 'Login Your Account', error: {}, existingValue: {}})


    } catch (e) {

    }
}
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}
