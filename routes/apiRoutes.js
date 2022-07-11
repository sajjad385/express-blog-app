const {index, store, reply} = require("../app/controllers/api/commentController");
const {isAuthenticated} = require("../app/middleware/authMiddleware");
const {storeLike, storeDisLike} = require("../app/controllers/api/likeDislikeController");
const {bookmarkStore} = require("../app/controllers/api/bookmarkController");
const apiRoutes = require('express').Router()

apiRoutes.get('/comments', isAuthenticated, index)
apiRoutes.post('/comments/:postId', isAuthenticated, store)
apiRoutes.post('/comments/replies/:commentId', isAuthenticated, reply)
apiRoutes.get('/likes/:postId', isAuthenticated, storeLike)
apiRoutes.get('/dislikes/:postId', isAuthenticated, storeDisLike)
apiRoutes.get('/bookmarks/:postId', isAuthenticated, bookmarkStore)

module.exports = apiRoutes