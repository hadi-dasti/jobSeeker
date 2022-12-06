const StartContract = require('../../../model/worker/contract/StartContractWorker')


// create startWorker
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

// get document startWorker with aggregation pip line and lookup
exports.getAllStartContractWorker = async(req,res)=>{
    try{
        const startContractWorker = await StartContract.aggregate([
            {
                $lookup:{
                    from:'workers',
                    localField :'workerId',
                    foreignField :'_id',
                    as :'worker'
                }
            },
            {
                $unwind:'$worker'
            },
            {
                $lookup:{
                    from :'contractstructures',
                    localField :'contractId',
                    foreignField: '_id',
                    as :'contractStructure'
                }
            },
            {
                $unwind:'$contractStructure'
            },
            {
                $lookup:{
                    from :'acceptcontracts',
                    localField: 'acceptContractId',
                    foreignField: '_id',
                    as :'acceptContract'
                }
            },
            {
                $unwind:'$acceptContract'
            }
        ])

        if(!startContractWorker){
            return res.status(404).json({
                success : false,
                msg :'ERROR-NOT-FOUND'
            })
        }

        return res.status(200).json({
            success : true,
            data : {
                startContractWorker
            },
            msg :'SUCCESSFULLY LOOKUP'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'Internal Server Error'
        })
    }
}