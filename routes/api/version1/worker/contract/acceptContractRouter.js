const router = require('express').Router()

// config on controller
const {acceptContractWorker,getAllAcceptContract} = require('../../../../../controller/worker/contract/acceptContractController')



// config router to Accept-Contract
router.post('/Accept-contract-worker/:workerId/:contractId',acceptContractWorker)
router.get('/getAcceptContract',getAllAcceptContract)





module.exports = router