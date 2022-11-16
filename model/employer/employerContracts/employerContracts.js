const {model,Schema} = require('mongoose')

const employerContract = new Schema({
    titleContract : {type : String ,required:[true ,'please provide a titleContract']},
    textContract : {type : String , required: [true,'please provide a textContract ']},
    orderTimeContract : {type : String ,enum:['ONE_DAY','ONE_WEEK','ONE_MONTH'], required:[true,'please provide a orderTimeContract']},
    signature: { type:String, unique : true, required : [true ,' please provide a signature']},
    employerId : {type : Schema.Types.ObjectId ,ref:'Employer'}
})




module.exports = model('EmployerContract',employerContract)