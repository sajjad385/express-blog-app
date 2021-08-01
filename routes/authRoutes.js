const {signupGet, signupPost, loginGet, loginPost, logout} = require("../controllers/authController");
const authRoutes = require('express').Router()

authRoutes.get('/signup', signupGet)
authRoutes.post('/signup', signupPost)
authRoutes.get('/login', loginGet)
authRoutes.post('/login', loginPost)
authRoutes.post('/logout', logout)

module.exports = authRoutes