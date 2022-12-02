const {model,Schema} = require('mongoose')

const contractStructureSchema = new Schema({
    titleJobContract :{type : String,required:[true,'please provide a titleJobContract']},
    contractContext :{type : String, required:[true ,'please provide a contractContext']},
    contractTime :{type :String, enum:['ONE_DAY','ONE_WEEK','ONE_MONTH'],required:[true,'please provide a contractTime']},
    contractCost : {type : String , required : [true ,'please provide a contractCost']},
    signature: { type:String, unique : true, required : [true ,' please provide a signature']},
    workerId:{type:[Schema.Types.ObjectId] , ref :'Worker'},
    acceptContractWorkerId :{type:[Schema.Types.ObjectId] , ref:'AcceptContract'}
},{
    timestamps : true
})



module.exports = model('ContractStructure',contractStructureSchema)