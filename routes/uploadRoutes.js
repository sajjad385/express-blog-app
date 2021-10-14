const router = require('express').Router()
const {isAuthenticated} = require("../app/middleware/authMiddleware");
const upload = require("../app/middleware/uploadMiddleware");
const {uploadProfilePicture, removeProfilePics} = require("../app/controllers/uploadController");


router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePicture)
router.delete('/profilePics', isAuthenticated, removeProfilePics)

module.exports = router