const StartContract = require('../../../model/worker/contract/StartContractWorker')



exports.createStartContract = async(req,res)=>{
    try{
        const{
            startWork,
            workerId,
            contractId,
            acceptContractId
        } = req.body;

        //  document instanceOf model
        const createStartWorkerContract = await StartContract.create({
            startWork,
            workerId,
            contractId,
            acceptContractId
        })

        // create document
        const startContracts = await createStartWorkerContract.save();

        if(!startContracts){
            return res.status(404).json({
                success : false,
                msg :'ERROR_NOT_FOUND'
            })
        }

        return res.status(201).json({
            success :true,
            data :{
                startContractsId : startContracts._id
            },
            msg :'CREATE_START_WORK'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'Internal Server Error'
        })
    }
}