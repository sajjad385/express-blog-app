const {signupGet, signupPost, loginGet, loginPost, logout} = require("../app/controllers/authController");
const authRoutes = require('express').Router()

const signupValidator = require("../app/validator/auth/signupValidator");
const loginValidator = require("../app/validator/auth/loginValidator");
const {isUnAuthenticated} = require("../app/middleware/authMiddleware");


authRoutes.get('/signup',isUnAuthenticated, signupGet)
authRoutes.post('/signup',isUnAuthenticated, signupValidator, signupPost)
authRoutes.get('/login',isUnAuthenticated, loginGet)
authRoutes.post('/login',isUnAuthenticated, loginValidator, loginPost)
authRoutes.get('/logout', logout)

module.exports = authRoutes