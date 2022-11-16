const {model,Schema}= require('mongoose')

const adminSchema = new Schema({
    firstName:{type : String , minLength : 3, index:true, required:[true,'please provide a firstName']},
    lastName:{type :String, minLength: 2, index:true,required:[true,'please provide a lastName']},
    email:{type : String, unique: true , required : [true,'please provide a email']},
    password:{type:String, minLength : 6 , select : false ,required :[true,'please provide a password']},
    phoneNumber:{type:String , minLength : 10, maxLength :12, index:true, required:[true,'please provide a phoneNumber']},
    role:{type: String , enum:['MANAGER','EMPLOYEE'],required :[true,'please provide a role']},
    isActive:{type : Boolean , default :false, required :[true,'please provide a isActive']},
    employer:{type : [Schema.Types.ObjectId], ref:'Employer'},
    worker:{type : [Schema.Types.ObjectId] , ref :'Worker'},
    employerContract: {type : [Schema.Types.ObjectId], ref :'EmployerContract'},
    workerContract :{type :[Schema.Types.ObjectId], ref:'WorkerContract'}

},
    { timestamps : true}
)

module.exports = model('Admin',adminSchema)