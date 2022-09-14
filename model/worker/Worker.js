const {model,Schema}= require('mongoose')


const workerSchema = new Schema({
    fName :{type: String, required :[true,'Please Provide a fName']},
    lName :{type : String,required :[true ,'Please Provide a lName']},
    gender:{type:String, enum :['MALE','FEMALE'], required:[true,'Please Provide a gender']},
    address :{type : String , unique :true, required :[true,'Please Provide a address']},
    socialSecurityNumber:{type :String,index:true, minLength:9 , required :[true,'Please Provide a socialSecurityNumber']},
    phone : {type :String, minLength: 8, required :[true,'Please Provide a phone']},
    mobileNumber:{type :String, minLength :9 , maxLength :11, unique: true,index :true, required :[true,'Please Provide a mobileNumber']},
    role :{type :String, enum :['SIMPLE','SPECIAL'],required :[true,'Please Provide a role']},
    password :{type :String , minLength : 6, select : false , required : [true,'Please Provide a password']},
    contracts :{type :Schema.Types.ObjectId , required : true, ref :'Contract'}

},{timestamps :true})


module.exports = model('Worker',workerSchema)
