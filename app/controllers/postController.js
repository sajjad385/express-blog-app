const {validationResult} = require("express-validator");
const readingTime = require('reading-time')

const Flash = require("../../utils/Flash");
const errorFormatter = require("../../utils/validationErrorFormatter");
const Post = require('../models/Post')
const Profile = require('../models/Profile')


exports.index = async (req, res, next) => {
    try {
        let posts = await Post.find({author: req.user._id})
        res.render('pages/dashboard/posts/index', {
            title: 'My Posts',
            flashMessage: Flash.getMessage(req),
            posts
        })
    } catch (e) {
        next(e)
    }
}
exports.create = (req, res, next) => {
    res.render('pages/dashboard/posts/create', {
        title: 'Create Post',
        error: {},
        existingValue: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.store = async (req, res, next) => {
    let {title, body, tags} = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped())
    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/posts/create', {
            title: 'Create Profile',
            error: errors.mapped(),
            existingValue: {title, body, tags},
            flashMessage: Flash.getMessage(req)
        })
    }
    if (tags) {
        tags = tags.split(',')
    }
    let readTime = readingTime(body).text

    let post = new Post({
        title,
        body,
        tags,
        author: req.user.id,
        thumbnail: '',
        readTime,
        likes: [],
        dislikes: [],
        comments: [],
    })
    if (req.file) {
        post.thumbnail = `/uploads/${req.file.filename}`
    }
    try {
        let createdPost = await post.save()
        await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$push: {'posts': createdPost._id}})
        req.flash('success', 'Post created successfully.')
        return res.redirect(`/posts/edit/${createdPost._id}`)
    } catch (e) {
        next(e)
    }
}

exports.edit = async (req, res, next) => {
    let id = req.params.id
    try {
        let post = await Post.findOne({author: req.user._id, _id: id})
        if (!post) {
            let error = new Error('404 Page Not found')
            error.status = 404
            throw error
        }
        res.render('pages/dashboard/posts/edit', {
            title: 'Edit Your Post',
            error: {},
            flashMessage: Flash.getMessage(req),
            post
        })

    } catch (e) {
        next(e)
    }
}

exports.update = async (req, res, next) => {
    let {title, body, tags} = req.body
    let id = req.params.id
    let errors = validationResult(req).formatWith(errorFormatter)
    let readTime = readingTime(body).text
    try {
        let post = Post.findOne({author: req.user._id, _id: id})
        if (!post) {
            let error = new Error('404 Page Not found')
            error.status = 404
            throw error
        }
        if (!errors.isEmpty()) {
            return res.render('pages/dashboard/posts/create', {
                title: 'Create Profile',
                error: errors.mapped(),
                existingValue: {title, body, tags},
                flashMessage: Flash.getMessage(req)
            })
        }
        if (tags) {
            tags = tags.split(',')
            tags = tags.map(tag => tag.trim())
        }
        let thumbnail = post.thumbnail
        if (req.file) {
            thumbnail = `/uploads/${req.file.filename}`
        }
        let updatedPost = await Post.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    title,
                    body,
                    tags,
                    thumbnail
                }
            }, {
                new: true
            }
        )
        req.flash('success', 'Post updated successfully.')
        return res.redirect(`/posts/edit/${updatedPost._id}`)
    } catch (e) {
        next(e)
    }
}


exports.destroy = async (req, res, next) => {
    let id = req.params.id
    try {
        let post = await Post.findOne({author: req.user._id, _id: id})
        if (!post) {
            let error = new Error('404 Page Not found')
            error.status = 404
            throw error
        }
        await Post.findOneAndDelete({_id: post._id})
        await Profile.findOneAndUpdate(
            {user: req.user._id},
            {$pull: {'posts': post._id}}
        )
        req.flash('success', 'Post deleted successfully.')
        return res.redirect('/posts')
    } catch (e) {
        next(e)
    }
}

