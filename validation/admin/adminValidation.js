const {body} = require('express-validator')

//validation body register admin
exports.validationRegisterAdmin = [
    body('firstName','please provide a firstName').notEmpty().isString().isLength({min:3}).exists(),
    body('lastName','please provide a lastName').notEmpty().isLength({min:2}).exists(),
    body('email','please provide a email').notEmpty().isEmail().trim().normalizeEmail().exists(),
    body('password','please provide a password').notEmpty().isLength({min:6}).isString().matches('^[0-9a-zA-Z]+$').exists(),
    body('phoneNumber','please provide a phoneNumber').notEmpty().isLength({min:9,max:12}).isString().exists(),
    body('role','please provide a role').notEmpty().isIn(['MANAGER','ADMIN']).isString().exists(),
    body('isActive','please provide a isActive').notEmpty().isBoolean().exists()
]

// validation body login admin
exports.validationLoginAdmin = [
    body('phoneNumber','please provide a phoneNumber').notEmpty().isLength({min:9,max:12}).isString().exists(),
    body('password','please provide a password').notEmpty().isLength({min:6}).isString().matches('^[0-9a-zA-Z]+$').exists(),
]

//validation body  verify admin
exports.validationVerifyAdmin =[
    body('otp','please provide a otp').isString().notEmpty().isLength({min:6}).matches('^[0-9]').exists(),
    body('adminId','please provide a adminId').isString().notEmpty().trim().matches('^[0-9a-zA-Z]+$').exists()
]