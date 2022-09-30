const router = require('express').Router();

// controller path
const {registerWorker,loginWorker} = require('../../../../controller/worker/workerController')


// register worker on app
router.post('/register', registerWorker)

// login worker on app
router.post('/login',loginWorker)

module.exports = router