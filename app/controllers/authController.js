const User = require('../models/User')
const bcrypt = require('bcrypt')
const {validationResult, body} = require("express-validator");
const errorFormatter = require('../../utils/validationErrorFormatter')
const Flash = require("../../utils/Flash");

exports.signupGet = (req, res, next) => {
    res.render('pages/auth/signup',
        {
            title: 'Create A New Account',
            error: {},
            existingValue: {},
            flashMessage: Flash.getMessage(req)
        })
}
exports.signupPost = async (req, res, next) => {
    let {username, email, password, confirmPassword} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        req.flash('fail','Please check given value!')
        return res.render('pages/auth/signup', {
            title: 'Create A New Account',
            error: errors.mapped(),
            existingValue: {
                username, email, password
            },
            flashMessage: Flash.getMessage(req)
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
        await user.save()
        req.flash('success','Signup Successfully')
        res.redirect('/auth/login')
    } catch (e) {
        next(e)
    }

}

exports.loginGet = (req, res, next) => {
    res.render('pages/auth/login', {
        title: 'Login Your Account',
        error: {},
        existingValue: {},
        flashMessage: Flash.getMessage(req)
    })
}
exports.loginPost = async (req, res, next) => {
    let {email, password} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        req.flash('fail','Please check given value!')
        console.log(errors.mapped())
        return res.render('pages/auth/login', {
            title: 'Login Your Account',
            error: errors.mapped(),
            existingValue: {email},
            flashMessage: Flash.getMessage(req)
        })
    }
    try {
        let user = await User.findOne({email})
        if (!user) {
            req.flash('fail','Please Provide Valid Credentials')
            return res.render('pages/auth/login', {
                title: 'Login Your Account',
                error: {},
                existingValue: {},
                flashMessage: Flash.getMessage(req)
            })
        }
        let passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            req.flash('fail','Please Provide Valid Credentials')
            return res.render('pages/auth/login', {
                title: 'Login Your Account',
                error: {},
                existingValue: {},
                flashMessage: Flash.getMessage(req)
            })
        }
        console.log('Successfully Logged In', user)
        // res.setHeader('Set-Cookie','isLoggedIn=true')
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                return next(err)
            }
            req.flash('success','Successfully Logged In')
            return res.redirect('/dashboard')
        })
        // res.render('pages/auth/login', {title: 'Login Your Account', error: {}, existingValue: {}})


    } catch (e) {

    }
}
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}
