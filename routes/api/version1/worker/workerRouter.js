const router = require('express').Router();



//check AUTH
const checkAuth = require('../../../../middleware/checkAuth')
// config body validation
const {validationRegisterWorker,validationLoginWorker,validationVerifyWorker} = require('../../../../validation/worker/workerValidation')
// config error validation
const {validationError} = require('../../../../validation/validationResult')
// controller path
const {registerWorker,loginWorker,verifyOtpWorker,verifyWorker} = require('../../../../controller/worker/workerController')


// register worker on app
router.post('/register',validationRegisterWorker,validationError, registerWorker)
// login worker on app
router.post('/login_worker_otp',validationLoginWorker,validationError,loginWorker)
// verify otp and  create token for worker
router.post('/verify_otp',validationVerifyWorker,validationError,verifyOtpWorker)


router.get('/test_token',checkAuth,verifyWorker)

module.exports = router