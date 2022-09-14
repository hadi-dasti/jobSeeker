const {model,Schema} = require('mongoose')


const employerSchema = new Schema({
    username :{type:String,minLength:6, required :[true,'Please provide a username']},
    personality : {type : String , enum :['REAL','LEGAL'] , default : 'REAL', required:[true,'Please provide a personality']},
    email :{type : String, unique :true, required : [true,'Please provide a email']},
    password:{type :String , select : false , minLength: 8, required :[true,'Please provide a password']},
    phone :{type :String , index : true, minLength : 9, required :[true,'Please provide a phone']},
    phoneNumber :{type:String ,index: true, minLength :11, required :[true,'Please provide a phoneNumber']},
    address:{type:String , required :[true,'Please provide a address']},
    nationalCode:{type : String, minLength :5 , maxLength : 10 , required :[true,'Please provide a nationalCode']},
    gender: {type: String, enum: ['MALE', 'FEMALE', 'COMPANY'], default: null, required :[true,'Please provide a gender']},
    contracts :{type :Schema.Types.ObjectId , ref :'Contract', required :[true,'Please provide a contracts']}
},{
    timestamps : true
})


module.exports = model('Employer',employerSchema)