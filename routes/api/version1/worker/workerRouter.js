const router = require('express').Router();



//check AUTH
const checkAuth = require('../../../../middleware/checkAuth')
// config body validation
const {validationRegisterWorker,validationLoginWorker,validationVerifyWorker} = require('../../../../validation/worker/workerValidation')
// config error validation
const {validationError} = require('../../../../validation/validationResult')
// controller path
const {registerWorker,loginWorker,verifyOtpWorker} = require('../../../../controller/worker/workerController')


// register worker on app
router.post('/register',validationRegisterWorker,validationError, registerWorker)
// login worker on app
router.post('/login_worker_otp',validationLoginWorker,validationError,loginWorker)
// verify otp and  create token for worker
router.post('/verify_otp',validationVerifyWorker,validationError,verifyOtpWorker)




// config contract for worker
router.use('/contract',checkAuth ,require('./contract/contractStructureRouter'))
// config Accept_Contract
router.use('/accept_contract',require('./contract/acceptContractRouter'))

module.exports = router