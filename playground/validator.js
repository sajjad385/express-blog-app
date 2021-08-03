const router = require('express').Router()
const {check, validationResult} = require('express-validator')
const Flash = require("../utils/Flash");

router.get('/validator', (req, res, next) => {
    // console.log(req.flash('fail'))
    // console.log(req.flash('success'))

    console.log(Flash.getMessage(req))
    res.render('playground/signup', {title: 'Validator PlayGround'})
})

router.post('/validator',
    check('username')
        .not()
        .isEmpty().withMessage('Username can not be Empty')
        .isLength({max: 15}).withMessage('Username can not be greater than 15 Character').trim()
    ,
    check('email')
        .isEmail().withMessage('Please Provide  A Valid Email').normalizeEmail(),
    check('password').custom(value => {
        if (value.length < 5) {
            throw new Error('Password Must be greater than 5 characters')
        }
        return true
    }),
    check('confirmPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error(`Password Doesn't match!`)
        }
        return true
    }),
    (req, res, next) => {
        //validation check results
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('fail', 'There is Some error')
        }else{
            req.flash('success', 'There is no Some error')
        }
        res.redirect('/playground/validator')
        // console.log(errors)
        // console.log(errors.isEmpty())
        // console.log(errors.mapped())
        // console.log(errors.array())


        // const formatter = error => error.msg
        // console.log(errors.formatWith(formatter).mapped())
        // console.log(req.body.username,req.body.email)
        //
        // res.render('playground/signup', {title: 'Validator PlayGround'})
    })

module.exports = router