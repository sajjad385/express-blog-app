const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");
const {validationResult} = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");
const User = require("../models/User");
exports.dashboardGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({user: req.user._id})
        if (profile) {
            return res.render('pages/dashboard/dashboard', {
                title: 'My Dashboard',
                flashMessage: Flash.getMessage(req)
            })
        }
        res.redirect('/dashboard/create-profile')
    } catch (e) {
        next(e)
    }


}
exports.createProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({user: req.user._id})
        if (profile) {
            return res.redirect('/dashboard/edit-profile')
        }
        res.render('pages/dashboard/create-profile', {
            title: 'Create Profile',
            error: {},
            flashMessage: Flash.getMessage(req)
        })
    } catch (e) {
        next(e)
    }
}
exports.createProfilePostController = async (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/create-profile', {
            title: 'Create Profile',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }
    let {name, title, bio, website, facebook, twitter, github} = req.body
    try {
        let profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePics: req.user.profilePics,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || '',
            },
            posts: [],
            bookmarks: []
        })
        let createdProfile = await profile.save()
        await User.findOneAndUpdate({_id: req.user._id}, {
            $set: {
                profile: createdProfile._id
            }
        })
        req.flash('success', 'Profile Created Successfully!')
        return res.redirect('/dashboard')

    } catch (e) {
        next(e)
    }


}

exports.editProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({user: req.user._id})
        if (profile) {
            return res.render('pages/dashboard/edit-profile', {
                title: 'Edit Profile',
                flashMessage: Flash.getMessage(req)
            })
        }
        return res.redirect('/dashboard/create-profile')
    } catch (e) {
        next(e)
    }
}

exports.editProfilePostController = (req, res, next) => {

}