const {validationResult} = require("express-validator");

const Flash = require("../../../utils/Flash");
const errorFormatter = require("../../../utils/validationErrorFormatter");
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const Profile = require("../../models/Profile");


exports.index = async (req, res, next) => {
    try {
        let comments = await Comment.find({author: req.user._id})
        res.status(200).json({comments})
    } catch (e) {
        next(e)
    }
}
exports.store = async (req, res, next) => {
    let {postId} = req.params
    let {body} = req.body
    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user.'
        })
    }
    try {
        let comment = new Comment({
            post: postId,
            user: req.user._id,
            body,
            replies: []
        })
        let createdComment = await comment.save();
        await Post.findOneAndUpdate(
            {_id: postId},
            {$push: {'comments': createdComment._id}})
        let commentJson = Comment.findById(createdComment._id).populate({
            path: 'user',
            select: 'profilePics username'
        })
        res.status(201).json({commentJson})
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}
exports.reply = async (req, res, next) => {
    let {commentId} = req.params
    let {body} = req.body
    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user.'
        })
    }
    let reply = {
        body,
        user: req.user._id
    }
    try {
        await Comment.findOneAndUpdate(
            {_id: commentId},
            {$push: {'replies': reply}})
        res.status(201).json({
            ...reply,
            profilePics : req.user.profilePics
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}