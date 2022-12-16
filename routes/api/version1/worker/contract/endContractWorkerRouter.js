const router = require('express').Router()


// config controller
const {createEndContractWorker,getOneContractWorker,getAllEndContractWorker} = require('../../../../../controller/worker/contract/endContractWorkerController')



//create router method POST
router.post('/create_end-contract/:workerId',createEndContractWorker)
//create router for one get endContractController
router.get('/get_end-contract',getOneContractWorker)
//create router and methode for get ALL endContractRouter
router.get('/get-all-endContract',getAllEndContractWorker)




module.exports = router