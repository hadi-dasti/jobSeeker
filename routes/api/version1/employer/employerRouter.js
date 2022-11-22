const router = require('express').Router()


//CONFIG AUTH
const checkAuth = require('../../../../middleware/checkAuth')
// CONFIG CONTROLLER
const{registerEmployer,loginEmployer,verifyOtp}=require('../../../../controller/employer/employerController')
//CONFIG VALIDATION ERROR
const {validationError} = require('../../../../validation/validationResult')
// CONFIG VALIDATION REQ.BODY
const {validationRegisterEmployer,validationLoginEmployer,validationVerifyEmployer} = require('../../../../validation/employer/validationEmloyer')



// register Employer
router.post('/sing-up',validationRegisterEmployer,validationError,registerEmployer)
//login employer
router.post('/login-employer',validationLoginEmployer,validationError,loginEmployer)
// verify otp
router.post('/verify-otp-employer',validationVerifyEmployer,validationError,verifyOtp)









module.exports = router