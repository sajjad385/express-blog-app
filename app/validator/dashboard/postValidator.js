const {body} = require("express-validator");
const validator = require('validator')
const cheerio = require('cheerio')

module.exports = [
    body('title')
        .not().notEmpty().withMessage('Title cannot be empty')
        .isLength({max:100}).withMessage('Title cannot be greater than 100 characters')
        .trim(),
    body('body')
        .not().notEmpty().withMessage('Body cannot be empty')
        .custom(value=>{
            let $ = cheerio.load(value)
            let text = $.text()
            if (text.length >5000){
                throw  new Error('Body cannot be greater than 5000 characters')
            }
            return true
        })
]
