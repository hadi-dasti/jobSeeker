const {model,Schema} = require('mongoose')


const AcceptContractSchema = new Schema({
    acceptContract :{type : String, enum:['YES','NO'], require:[true,'please provide a acceptContract']},
    workerId: {type:[Schema.Types.ObjectId], ref:'Worker'},
    contractId :{type:[Schema.Types.ObjectId],ref:'ContractStructure'}

},{
    timestamps:true
})


module.exports= model('AcceptContract',AcceptContractSchema)