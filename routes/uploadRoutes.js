const router = require('express').Router()
const {isAuthenticated} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {uploadProfilePicture} = require("../controllers/uploadController");


router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePicture)

module.exports = router