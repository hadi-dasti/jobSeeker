const router = require('express').Router();

// controller path
const {registerWorker,loginWorker,verifyOtpWorker} = require('../../../../controller/worker/workerController')


// register worker on app
router.post('/register', registerWorker)
// login worker on app
router.post('/login_worker_otp',loginWorker)
// verify otp and  create token for worker
router.post('/verify_otp',verifyOtpWorker)

module.exports = router