const router = require('express').Router()
const {isAuthenticated} = require("../app/middleware/authMiddleware");
const upload = require("../app/middleware/uploadMiddleware");
const {
    uploadProfilePicture,
    removeProfilePics,
    postImageUpload
} = require("../app/controllers/uploadController");


router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePicture)
router.delete('/profilePics', isAuthenticated, removeProfilePics)

router.post('/uploads/post-image', isAuthenticated, upload.single('post-image', postImageUpload))

module.exports = router