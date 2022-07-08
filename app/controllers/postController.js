const Flash = require("../../utils/Flash");
const {validationResult} = require("express-validator");
const errorFormatter = require("../../utils/validationErrorFormatter");


exports.create = (req, res, next) => {
    res.render('pages/dashboard/posts/create', {
        title: 'Create Post',
        error: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.store = async (req, res, next) => {
    console.log(req.body)
    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped())
    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/posts/create', {
            title: 'Create Profile',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }
}