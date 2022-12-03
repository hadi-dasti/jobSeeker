const AcceptContract = require('../../../model/worker/contract/AcceptContractWorker')
const ContractStructure = require('../../../model/worker/contract/ContractStructure')
const Worker = require('../../../model/worker/Worker')


// create AcceptContract with ContractId and WorkerId
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

// get all document acceptContract with lookup
exports.getAllAcceptContract = async(req,res)=>{

    try{
        const acceptContract = await AcceptContract.aggregate([
            {
                $lookup:{
                    from :"workers",
                    localField :"workerId",
                    foreignField :"_id",
                    as : 'worker'
                }
            },
            {
                $unwind :"$worker"
            },
            {
                $lookup :{
                    from : "contractstructures",
                    localField: "contractId",
                    foreignField: "_id",
                    as:"contractStructure"
                }
            },
            {
                $unwind : "$contractStructure"
            },
            {
                $project:{
                    "workerId":0,
                    "contractId":0,
                    "createdAt": 0,
                    "updatedAt": 0,
                    "__v": 0
                }
            }
            ])

        if(!acceptContract){
            return res.status(404).json({
                success : false,
                msg : 'NOT-FOUND-ERROR'
            })
        }

        return res.status(200).json({
            success:true,
            data :{
                 acceptContract
            },
            msg : 'successfully get all acceptContract with lookup'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : "Internal Server Error"
        })
    }
}

// delete AcceptContract with workerId and contractId
exports.deleteAcceptContract = async(req,res)=>{
    try{

        //found acceptContractId
        const deleteAcceptContract = await AcceptContract.findByIdAndDelete(req.params.id)

        if(!deleteAcceptContract){
           return res.status(404).json({
               success : false,
               msg : 'ERROR_NOT_FOUND'
           })
        }

        // found acceptContractId for delete in worker
        const ownerWorker = deleteAcceptContract.workerId

        if(ownerWorker){
                const parentWorkerId = await Worker.findByIdAndUpdate(ownerWorker,{
                    $pull :{acceptContractWorkerId: req.params.id}
                },
                 {
                    new:true
                })
            console.log(parentWorkerId)
        }


        // found acceptContractId for delete contract
        const ownerContract = deleteAcceptContract.contractId;

        if(ownerContract){
            const parentContractId = await ContractStructure.findByIdAndUpdate(ownerContract,{
                $pull:{acceptContractWorkerId:req.params.id}
            },
            {
              new : true
            })
            console.log(parentContractId)
        }


        return res.status(200).json({
            success : true,
            msg : 'successfully delete acceptContract with workerId and contractStructureId'
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : 'Internal Server Error'
        })
    }

}