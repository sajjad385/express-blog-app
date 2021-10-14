const {isAuthenticated} = require("../app/middleware/authMiddleware");
const {create, store} = require("../app/controllers/postController");
const postValidator = require('../app/validator/dashboard/postValidator')
const router = require('express').Router()

router.get('/create', isAuthenticated, create)
router.post('/create', isAuthenticated, postValidator, store)
module.exports = router