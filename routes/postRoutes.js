const {isAuthenticated} = require("../middleware/authMiddleware");
const {create, store} = require("../controllers/postController");
const router = require('express').Router()

router.get('/create', isAuthenticated, create)
router.post('/create', isAuthenticated, store)
module.exports = router