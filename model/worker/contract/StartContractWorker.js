const {model,Schema} =require('mongoose')

const StartContractSchema = new Schema({
    startWork: {type:String,enum:['YES','NO'],required:[true,'please provide a startWork '],message:'{VALUE} is not supported'},
    workerId :{type :Schema.Types.ObjectId , ref :'Worker'},
    contractId:{type:Schema.Types.ObjectId, ref:'ContractStructure'},
    acceptContractId :{type:[Schema.Types.ObjectId],ref:'AcceptContract'}
},{
    timestamps:true
})


module.exports = model('StartContractWorker',StartContractSchema)