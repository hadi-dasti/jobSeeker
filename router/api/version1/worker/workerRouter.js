const router = require('express').Router();

// controller path
const {registerWorker,loginWorker} = require('../../../../controller/worker/workerController')


// register worker on app
router.post('/register', registerWorker)

// login worker on app
router.post('/login_worker_otp',loginWorker)

module.exports = router