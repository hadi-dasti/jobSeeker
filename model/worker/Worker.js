const {model,Schema}= require('mongoose')


const workerSchema = new Schema({
    fName :{type: String, required :[true,'Please provide a fName']},
    lName :{type : String,required :[true ,'Please provide a lName']},
    gender:{type:String, enum :['MALE','FEMALE'], required:[true,'Please provide a gender']},
    address :{type : String , unique :true, required :[true,'Please provide a address']},
    socialSecurityNumber:{type :String,index:true, minLength:9 , required :[true,'Please Provide a socialSecurityNumber']},
    phone : {type :String, minLength: 8, required :[true,'Please provide a phone']},
    mobileNumber:{type :String, minLength :9 , maxLength :11, unique: true,index :true, required :[true,'Please provide a mobileNumber']},
    roleWorker :{type :String, enum :['SIMPLE','SPECIAL'],required :[true,'Please provide a roleWorker']},
    password :{type :String , minLength : 6, select : false , required : [true,'Please provide a password']},
    financial :{type : Schema.Types.ObjectId , required : true, ref :'Financial'}

},
    {timestamps :true}
)


module.exports = model('Worker',workerSchema)
