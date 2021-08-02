const {signupGet, signupPost, loginGet, loginPost, logout} = require("../controllers/authController");
const authRoutes = require('express').Router()

const signupValidator = require("../validator/auth/signupValidator");


authRoutes.get('/signup', signupGet)
authRoutes.post('/signup', signupValidator, signupPost)
authRoutes.get('/login', loginGet)
authRoutes.post('/login', loginPost)
authRoutes.post('/logout', logout)

module.exports = authRoutes