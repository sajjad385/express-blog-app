const {body} = require("express-validator");
const validator = require('validator')

const linkValidator = value => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error('Please enter a valid URL')
        }
    }
    return true
}
module.exports = [
    body('name')
        .not().isEmpty().withMessage('Name can not be Empty')
        .isLength({max: 50}).withMessage('Name cannot be more than 50 characters').trim(),
    body('title')
        .not().isEmpty().withMessage('Title cannot be Empty')
        .isLength({max: 100}).withMessage('Name cannot be more than 100 characters').trim(),
    body('bio')
        .not().isEmpty().withMessage('Bio can not be Empty')
        .isLength({max: 500}).withMessage('Bio cannot be more than 500 characters').trim(),
    body('website')
        .custom(linkValidator),
    body('facebook')
        .custom(linkValidator),
    body('twitter')
        .custom(linkValidator),
    body('github')
        .custom(value => {
            if (value) {
                if (!validator.isURL(value)) {
                    throw new Error('Please enter a valid URL')
                }
            }
            return true
        }),
]