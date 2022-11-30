const {model,Schema} = require('mongoose')


const AcceptContractSchema = new Schema({
    acceptContract :{type : String,enum:['YES','NO'], require:[true,'please provide a acceptContract']},
    worker: {type:[Schema.Types.ObjectId], ref:'Worker'},
    contract :{type:[Schema.Types.ObjectId],ref:'ContractStructure'}

})


module.exports= model('AcceptContract',AcceptContractSchema)