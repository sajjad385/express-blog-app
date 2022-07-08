const fs = require('fs')
const User = require("../models/User");
const Profile = require("../models/Profile");
exports.uploadProfilePicture = async (req, res, next) => {
    if (req.file) {
        try {
            let oldProfilePics = req.user.profilePics
            let profile = await Profile.findOne({user: req.user._id})
            let profilePics = `/uploads/${req.file.filename}`
            if (profile) {
                await Profile.findOneAndUpdate(
                    {user: req.user._id},
                    {
                        $set: {profilePics}
                    })
            }
            await User.findOneAndUpdate({_id: req.user._id},
                {$set: {profilePics: profilePics}}
            )
            if (oldProfilePics !== '/uploads/default.jpg') {
                fs.unlink(`public${oldProfilePics}`, err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
            res.status(200).json({profilePics})
        } catch (e) {
            res.status(500).json({
                profilePics: req.user.profilePics
            })
        }
    } else {
        res.status(500).json({
            profilePics: req.user.profilePics
        })
    }
}

exports.removeProfilePics = (req, res, next) => {
    try {
        let defaultProfile = '/uploads/default.jpg'
        let currentProfilePics = req.user.profilePics

        fs.unlink(`public${currentProfilePics}`, async (err) => {
            let profile = Profile.findOne({user: req.user._id})
            if (profile) {
                await Profile.findOneAndUpdate({user: req.user._id},
                    {$set: {profilePics: defaultProfile}}
                )
            }
            await User.findOneAndUpdate({_id: req.user._id},
                {$set: {profilePics: defaultProfile}}
            )
        })
        res.status(200).json({profilePics: defaultProfile})

    } catch (e) {
        console.log(e)
    }
}

exports.postImageUpload = (req, res, next) => {
    if (req.file) {
        console.log(req.file)
        return res.status(200).json({
            imgUrl: `/uploads/${req.file.filename}`,
            message : 'Uploaded Successfully'
        })
    }
    return res.status(500).json({
        message: 'Server Error'
    })
}