const router = require('express').Router()

// config on controller
const {acceptContractWorker,getAllAcceptContract,deleteAcceptContract} = require('../../../../../controller/worker/contract/acceptContractController')



// config router to Accept-Contract
router.post('/Accept-contract-worker/:workerId/:contractId',acceptContractWorker)
router.get('/getAcceptContract',getAllAcceptContract)
router.delete('/acceptContract/:id',deleteAcceptContract)




module.exports = router