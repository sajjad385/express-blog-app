const router = require('express').Router()
const {isAuthenticated} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {uploadProfilePicture, removeProfilePics} = require("../controllers/uploadController");


router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePicture)
router.delete('/profilePics', isAuthenticated, removeProfilePics)

module.exports = router