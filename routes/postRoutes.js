const router = require('express').Router()
const {isAuthenticated} = require("../app/middleware/authMiddleware");
const {create, store, edit, update, destroy} = require("../app/controllers/postController");
const postValidator = require('../app/validator/dashboard/postValidator')
const upload = require("../app/middleware/uploadMiddleware");

router.get('/create', isAuthenticated, create)
router.post('/create', isAuthenticated,upload.single('post-thumbnail'), postValidator, store)
router.get('/edit/:id', isAuthenticated, edit)
router.post('/update/:id', isAuthenticated, upload.single('post-thumbnail'), postValidator, update)
router.get('/delete/:id', isAuthenticated, destroy)
module.exports = router