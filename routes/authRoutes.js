const {signupGet, signupPost, loginGet, loginPost, logout} = require("../controllers/authController");
const authRoutes = require('express').Router()

const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");


authRoutes.get('/signup', signupGet)
authRoutes.post('/signup', signupValidator, signupPost)
authRoutes.get('/login', loginGet)
authRoutes.post('/login', loginValidator, loginPost)
authRoutes.post('/logout', logout)

module.exports = authRoutes