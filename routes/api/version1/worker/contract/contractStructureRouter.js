const router = require('express').Router()


//CONFIG PATH CONTROLLER
const {createContractWorker,getAllContract,updateContract,deleteContract} =require('../../../../../controller/worker/contract/contractStrucureController')



//create structure router
router.post('/create-contract',createContractWorker)

// get all contract
router.get('/get-contract',getAllContract)

//update contract
router.put('/update_contract/:contractID',updateContract)

// delete contract
router.delete('/delete_contract/:contractID',deleteContract)














module.exports = router