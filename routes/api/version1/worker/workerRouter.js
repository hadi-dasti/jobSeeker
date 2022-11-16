const router = require('express').Router();
const checkAuthWorker = require('../../../../middleware/worker/checkAuth')

// controller path
const {registerWorker,loginWorker,verifyOtpWorker,verifyWorker} = require('../../../../controller/worker/workerController')


// register worker on app
router.post('/register', registerWorker)
// login worker on app
router.post('/login_worker_otp',loginWorker)
// verify otp and  create token for worker
router.post('/verify_otp',verifyOtpWorker)

router.get('/test_token',checkAuthWorker,verifyWorker)

module.exports = router