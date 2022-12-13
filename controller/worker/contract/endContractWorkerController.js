const EndContractWorker = require('../../../model/worker/contract/EndContractWorker')
const Worker = require('../../../model/worker/Worker')
const ObjectId = require('mongoose').Types.ObjectId

exports.createEndContractWorker = async(req,res)=>{
    try{
        const {workerId} =req.params;
        const {endContract,contractId} =req.body;

        const createEndContractWorker = await EndContractWorker.create({
            endContract,
            contractId,
            workerId
        })

        const endContractWorker = await createEndContractWorker.save()

        if(!endContractWorker){
            return res.status(404).json({
                success : false,
                msg :'ERROR_NOT_FOUND'
            })
        }

        // found workerId and push in document Worker
        const worker = await Worker.findByIdAndUpdate(workerId,{
            $push:{
                endContractWorkerId : endContractWorker._id
            }
        },
            {
                new :true
            })
        console.log(worker)

        return res.status(201).json({
            success : true,
            data :{
                endContractWorkerId : endContractWorker._id
            },
            msg :"SUCCESSFULLY create EndWorkerContract"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'Internal Server Error'
        })
    }
}


exports.getOneContractWorker = async(req,res)=>{
    try{
        const getEndWorker = await EndContractWorker.aggregate([
            {
             $match : { _id: ObjectId("6398418490823bf41cd5eb4c")}
            },

            {
            $lookup :{
                    from :"workers",
                    localField:"workerId",
                    foreignField:"_id",
                    as :"worker"
                }
            },
            {
                $unwind :"$worker"
            },
            {
                $lookup :{
                    from :"contractstructures",
                    localField: "contractId",
                    foreignField: "_id",
                    as :"contractStructure"
                }
            },
            {
                $unwind : "$contractStructure"
            },
            {
                $project :{
                    "createdAt":0,
                    "updatedAt":0,
                    "__v":0,
                    "contractId" :0,
                    "workerId" :0
                }
            }
        ])

        if(!getEndWorker){
            return res.status(404).json({
                success : false,
                msg :'ERROR_NOT_FOUND'
            })
        }

        return res.status(200).json({
            success:true,
            data : getEndWorker,
            msg :'successfully get one endContractWorker'
        })

    }catch(err){
        return res.status(500).json({
            success : false,
            msg : [err.message , 'Internal Server Error']
        })
    }
}
