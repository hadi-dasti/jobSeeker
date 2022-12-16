const {model,Schema} = require('mongoose')


const SchemaEndContract = new Schema({
    endContract : { type : String , nem :['YES','NO'],require :[true,'please provide a endContract ']},
    workerId :{ type:Schema.Types.ObjectId , ref :'Worker'},
    contractId:{type :Schema.Types.ObjectId , ref :'ContractStructure'},
},{
    timestamps:true
})


module.exports = model('EndContractWorker',SchemaEndContract)