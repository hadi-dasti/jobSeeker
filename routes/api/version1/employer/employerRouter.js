const router = require('express').Router()
const checkAuth = require('../../../../middleware/checkAuth')
const{registerEmployer,loginEmployer,verifyOtp}=require('../../../../controller/employer/employerController')


// register Employer
router.post('/sing-up',registerEmployer)
router.post('/login-employer',loginEmployer)
router.post('/verify-otp-employer',verifyOtp)









module.exports = router