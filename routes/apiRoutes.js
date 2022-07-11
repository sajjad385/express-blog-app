const {index, store, reply} = require("../app/controllers/api/commentController");
const {isAuthenticated} = require("../app/middleware/authMiddleware");
const {storeLike, storeDisLike} = require("../app/controllers/api/likeDislikeController");
const apiRoutes = require('express').Router()

apiRoutes.get('/comments', isAuthenticated, index)
apiRoutes.post('/comments/:postId', isAuthenticated, store)
apiRoutes.post('/comments/replies/:commentId', isAuthenticated, reply)
apiRoutes.post('/likes/:postId', isAuthenticated, storeLike)
apiRoutes.post('/dislikes/:postId', isAuthenticated, storeDisLike)

module.exports = apiRoutes