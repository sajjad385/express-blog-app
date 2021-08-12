const Flash = require("../utils/Flash");


exports.create = (req, res, next) => {
    res.render('pages/dashboard/posts/create', {
        title: 'Create Post',
        error: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.store = (req, res, next) => {

}