const {body} =require('express-validator')

// validation body register worker
exports.validationRegisterWorker = [
    body('fName').isString().notEmpty().isLength({min :3}).matches('^[a-zA-Z]+$').withMessage('please provide a fName'),
    body('lName').isString().notEmpty().isLength({min :3}).matches('^[a-zA-Z]+$').withMessage('please provide a lName'),
    body('gender').isString().isIn(['MALE','FEMALE']).notEmpty().withMessage('please provide a gender'),
    body('address').isString().notEmpty().matches('^[a-zA-Z]+$').withMessage('please provide a address'),
    body('socialSecurityNumber').isString().notEmpty().isLength({min:9}).matches('^[0-9a-zA-Z]+$').withMessage('please provide a socialSecurityNumber'),
    body('phone').isString().notEmpty().isLength({min:7, max:12}).matches('^[0-9]').withMessage('please provide a phone'),
    body('mobileNumber').isString().notEmpty().isLength({min:9,max:11}).matches('^[0-9]').withMessage('please provide a mobileNumber'),
    body('password').isString().notEmpty().isLength({min:6}).matches('^[0-9a-zA-Z]+$').withMessage('please provide a password'),
    body('roleWorker').isString().notEmpty().isIn(['SIMPLE','SPECIAL']).withMessage('please provide a roleWorker')
]

// validation body login worker
exports.validationLoginWorker = [
    body('mobileNumber').isString().notEmpty().isLength({min:9,max:11}).matches('^[0-9]').withMessage('please provide a mobileNumber'),
]

// validation body verify  worker
exports.validationVerifyWorker = [
    body('otp').isString().notEmpty().isLength({min:6}).matches('^[0-9]').withMessage('please provide a otp'),
    body('workerId').isString().notEmpty().trim().matches('^[0-9a-zA-Z]+$').withMessage('please provide a workerId')
]