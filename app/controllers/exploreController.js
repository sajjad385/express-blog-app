const moment = require('moment')

const Flash = require("../../utils/Flash");
const Post = require('../models/Post')
const Profile = require("../models/Profile");
const generateDate = days => {
    let date = moment().subtract(days, 'days')
    return date.toDate()
}
const generateFilterObject = filter => {
    let filterObj = {}
    let order = 1

    switch (filter) {
        case 'latest' : {
            order = -1
            break
        }
        case 'week' : {
            filterObj = {
                createdAt: {
                    $gt: generateDate(7)
                }
            }
            order = -1
            break
        }
        case 'month' : {
            filterObj = {
                createdAt: {
                    $gt: generateDate(30)
                }
            }
            order = -1
            break
        }
        case 'all' : {
            order = -1
            break
        }
    }
    return {
        filterObj,
        order
    }

}
exports.index = async (req, res, next) => {
    let filter = req.query.filter || 'latest'
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = parseInt(req.query.limit) || 2
    let {filterObj, order} = generateFilterObject(filter.toLowerCase())
    try {
        let posts = await Post.find(filterObj)
            .populate('author', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)
        let totalPost = await Post.countDocuments()
        let totalPage = totalPost / itemPerPage
        let bookmarks = []
        if (req.user) {
            let profile = await Profile.findOne({user: req.user._id})
            if (profile) {
                bookmarks = profile.bookmarks
            }
        }
        res.render('pages/explorer/index', {
            title: 'Explore All Posts',
            filter: filter,
            flashMessage: Flash.getMessage(req),
            posts,
            itemPerPage,
            currentPage,
            totalPost,
            totalPage,
            bookmarks

        })
    } catch (e) {
        next(e)
    }
}
