const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfilePostController,
    editProfileGetController
} = require("../app/controllers/dashboardController");
const {isAuthenticated} = require("../app/middleware/authMiddleware");
const router = require('express').Router()
const profileValidator =require('../app/validator/dashboard/profileValidator')

router.get('/', isAuthenticated, dashboardGetController)
router.get('/create-profile', isAuthenticated, createProfileGetController)
router.post('/create-profile', isAuthenticated,profileValidator, createProfilePostController)
router.get('/edit-profile', isAuthenticated, editProfileGetController)
router.post('/edit-profile', isAuthenticated, editProfilePostController)

module.exports = router