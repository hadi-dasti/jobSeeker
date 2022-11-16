const {model,Schema} = require('mongoose')

const workerContractSchema = new Schema({
    titleJobContract :{type : String,required:[true,'please provide a titleJobContract']},
    contractContext :{type : String, required:[true ,'please provide a contractContext']},
    contractTime :{type :String, enum:['ONE_DAY','ONE_WEEK','ONE_MONTH'],required:[true,'please provide a contractTime']},
    contractCost : {type : String , required : [true ,'please provide a contractCost']},
    signature: { type:String, unique : true, required : [true ,' please provide a signature']},
    worker:{type:[Schema.Types.ObjectId] , ref :'Worker'},
    financial: {type : Schema.Types.ObjectId , required : true ,ref :"Financial"}
},{
    timestamps : true
})



module.exports = model('WorkerContract',workerContractSchema)