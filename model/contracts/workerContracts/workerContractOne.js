const {model,Schema} = require('mongoose')

const workerContractSchema = new Schema({
    titleJobContract :{type : String,required:[true,'please provide a titleJobContract']},
    contractContext :{type : String, required:[true ,'please provide a contractContext']},
    contractTime :{type :String, enum:['ONE_DAY','ONE_WEEK','ONE_MONTH'],required:[true,'please provide a contractTime']},
    receiveAdvancePayment: {type : Boolean , required : [true ,'please provide a receiveAdvancePayment']},
    worker:{type:Schema.Types.ObjectId , ref :'Worker'},
    admin :{types:Schema.Types.ObjectId, ref :"Admin"}
},{
    timestamps : true
})



module.exports = model('WorkerContractOne',workerContractSchema)