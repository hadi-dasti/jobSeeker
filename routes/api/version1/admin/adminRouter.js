const router = require('express').Router()


// config AUTH
const {checkAuth} =require('../../../../middleware/checkAuth')
// config controller
const {registerAdmin,loginAdmin,verifyAdmin} = require('../../../../controller/admin/adminController')
// config error validation
const {validationError} =require('../../../../validation/validationResult')
//config body validation
const {validationRegisterAdmin,validationLoginAdmin,validationVerifyAdmin} = require('../../../../validation/admin/adminValidation')





// register admin
router.post('/register',validationRegisterAdmin,validationError,registerAdmin)
// login admin
router.post('/admin_login',validationLoginAdmin,validationError,loginAdmin)
// verify otp
router.post('/admin_verify',validationVerifyAdmin,validationError,verifyAdmin)





module.exports = router