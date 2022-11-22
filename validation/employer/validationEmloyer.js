const {body} = require('express-validator')



// validation register req.body employer
exports.validationRegisterEmployer = [
    body('username','please provide a username').notEmpty().isString().isLength({min:5}).exists(),
    body('personality','please provide a personality').notEmpty().isString().isIn(['REAL','LEGAL']).exists(),
    body('email','please provide a email').isEmail().notEmpty().isString().trim().exists(),
    body('password','please provide a password').notEmpty().isLength({min:6}).matches('^[0-9a-zA-Z]+$').exists(),
    body('phone','please provide a phone').notEmpty().isLength({min:7 , max:11}).isString().exists(),
    body('phoneMobile','please provide a phoneMobile').notEmpty().isString().isLength({min:9,max:11}).exists(),
    body('address','please provide a address').not().isEmpty().trim().matches('^[0-9a-zA-Z]+$').exists(),
    body('nationalCode','please provide a nationalCode').notEmpty().isLength({min:7,max:10}).isString().exists(),
    body('gender','please provide a gender').notEmpty().isIn(['MALE', 'FEMALE', 'COMPANY']).isString().exists()
]

// validation login req.body employer
exports.validationLoginEmployer =[
    body('phoneMobile','please provide a phoneMobile').notEmpty().isString().isLength({min:9,max:11}).exists(),
]

// validation verify req.body employer
exports.validationVerifyEmployer =[
    body('otp','please provide a otp').notEmpty().isLength({min:6}).matches('^[0-9]').exists(),
    body('employerId','please provide a employerId').isString().notEmpty().trim().matches('^[0-9a-zA-Z]+$').exists()
]