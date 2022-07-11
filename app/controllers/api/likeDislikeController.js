const Post = require('../../models/Post')

exports.storeLike = async (req, res, next) => {
    let {postId} = req.params
    let userId = req.user._id
    let liked = null
    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user.'
        })
    }
    try {
        let post = Post.findById(postId)
        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                {_id: postId},
                {$pull: {'dislikes': userId}}
            )
        }
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                {_id: postId},
                {$pull: {'likes': userId}}
            )
        } else {
            await Post.findOneAndUpdate(
                {_id: postId},
                {$push: {'likes': userId}}
            )
            liked = true
        }
        let updatedPost = await Post.findById(postId)
        res.status(201).json({
            liked,
            totalLikes: updatedPost.likes.length,
            totalDisLikes: updatedPost.dislikes.length,
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}
exports.storeDisLike = async (req, res, next) => {
    let {postId} = req.params
    let userId = req.user._id
    let disliked = null
    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user.'
        })
    }
    try {
        let post = Post.findById(postId)
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                {_id: postId},
                {$pull: {'likes': userId}}
            )
        }
        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                {_id: postId},
                {$pull: {'dislikes': userId}}
            )
            disliked = false
        } else {
            await Post.findOneAndUpdate(
                {_id: postId},
                {$push: {'dislikes': userId}}
            )
            disliked = true
        }
        let updatedPost = await Post.findById(postId)
        res.status(201).json({
            disliked,
            totalLikes: updatedPost.likes.length,
            totalDisLikes: updatedPost.dislikes.length,
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}