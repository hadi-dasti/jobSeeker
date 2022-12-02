const AcceptContract = require('../../../model/worker/contract/AcceptContractWorker')
const ContractStructure = require('../../../model/worker/contract/ContractStructure')
const Worker = require('../../../model/worker/Worker')



exports.acceptContractWorker = async(req,res)=>{
    try{
            const {acceptContract} =req.body;
            const {workerId,contractId} = req.params;

        // if response worker === no
        if(acceptContract === 'NO'){
            return res.redirect('./contract')
        }

        // create document accept-contract
        const accept = await AcceptContract.create({
            acceptContract,
            workerId,
            contractId
        })

        const acceptContractWorker = await accept.save()

        if(!acceptContractWorker){
            return res.status(404).json({
                success : false,
                msg :'ERROR_NOT_FOUND'
            })
        }

        // edit worker
        const foundWorker = await  Worker.findByIdAndUpdate(workerId,
            {
            $push :{acceptContractWorkerId :acceptContractWorker._id},
            },
            {
             new : true
            })

        // edit contractStructure
        const foundContractStructure = await ContractStructure.findByIdAndUpdate(contractId,
            {
                $push : {acceptContractWorkerId: acceptContractWorker._id}
            },
            {
                new :true
            })

        return res.status(201).json({
            success : true,
            data :
                {acceptContractWorkerID : acceptContractWorker._id},
            msg : `successfully accept_contract with push ${foundWorker.id} and ${foundContractStructure._id} `
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : 'Internal Error'
        })
    }
}