const User = require('../models/User')
const {use} = require("express/lib/router");

exports.signupGet = (req, res, next) => {
    res.render('pages/auth/signup', {title: 'Create A New Account'})
}
exports.signupPost = async (req, res, next) => {
    let {username, email, password, confirmPassword} = req.body
    let user = new User({
        username,
        email,
        password
    })
    try {
        let createdUser = await user.save()
        console.log('User Created Successfully',createdUser)
        res.render('pages/auth/signup', {title: 'Create A New Account'})
    } catch (e) {

    }

}

exports.loginGet = (req, res, next) => {

}
exports.loginPost = (req, res, next) => {

}
exports.logout = (req, res, next) => {

}
