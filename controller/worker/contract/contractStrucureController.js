const  ContractStructure = require('../../../model/worker/contract/ContractStructure')





// create contract for worker
exports.createContractWorker = async(req,res)=>{

    try {

        const {
            titleJobContract,
            contractContext,
            contractTime,
            contractCost,
            signature
        } = req.body;

        // create document instance of  model
        const CreateContractStructure =  await ContractStructure.create({
            titleJobContract,
            contractContext,
            contractTime,
            contractCost,
            signature
        })

        // save document instance of model
        const contractStructure = await CreateContractStructure.save();

        if(!contractStructure){
            return res.status(404).json({
                success : false,
                msg : 'ERROR_NOT_FOUND'
            })
        }

        return res.status(201).json({
            success: true,
            data :{
                contractStructureId : contractStructure._id
            },
            msg :"SUCCESSFULLY CONTRACT"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :"INTERNAL ERROR"
        })
    }
}

// get All contract
exports.getAllContract = async(req,res)=>{
    try {

        const contracts = await ContractStructure.find({},{ "__v": 0, "updatedAt": 0, "createdAt": 0 })
        if(!contracts){
           return res.status(404).json({
               success : false,
               msg : 'ERROR_NOT_FOUND'
           })
        }

        return res.status(200).json({
            success : true,
            data:{
                contracts
                },
            msg :'SUCCESSFULLY GET ALL CONTRACT'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'INTERNAL ERROR'
        })
    }
}

//update contract
exports.updateContract = async(req,res)=>{

    try{
        const {
            titleJobContract,
            contractContext,
            contractTime,
            contractCost,
            signature
        } = req.body;

        const contractID = req.params;

        const contract = await ContractStructure.findOneAndUpdate(contractID,{

            $set : {
                titleJobContract,
                contractContext,
                contractTime,
                contractCost,
                signature
            }
        },{
            new : true
        })

        if(!contract){
            return res.status(404).json({
                success :false,
                msg :"ERROR_NOT_FOUND"
            })
        }

        return res.status(200).json({
            success : true,
            data :{
                 contract
            },
            msg :"successfully update contract with id"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : 'Internal Server Error'
        })
    }
}

// delete contract
exports.deleteContract = async(req,res)=>{
    try{
        const contractID = req.params;

        const contract = await ContractStructure.findOneAndDelete(contractID)

        if(!contract){
            return res.status(404).json({
                success : false,
                msg :'ERROR_NOT_FOUND_CONTRACT'
            })
        }

        return res.status(200).json({
            success : true,
            msg: 'successfully delete contract'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :"Internal Server Error"
        })
    }
}