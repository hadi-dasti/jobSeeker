const router = require('express').Router()

//path controller
const {createStartContract,getAllStartContractWorker} =require('../../../../../controller/worker/contract/startContractController')


// config router and create method for controller
router.post('/create_start_contract',createStartContract)
router.get('/getAll_startWorker',getAllStartContractWorker)




module.exports = router