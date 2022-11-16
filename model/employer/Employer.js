const {model,Schema} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,JWT_EXPIRE} = require('../../config')



const employerSchema = new Schema({
    username:{type:String, required :[true,'Please provide a username']},
    personality:{type : String , enum :['REAL','LEGAL'] , default : 'REAL', required:[true,'Please provide a personality']},
    email:{type : String, unique :true, required : [true,'Please provide a email']},
    password:{type :String , select : false , minLength: 8, required :[true,'Please provide a password']},
    phone:{type :String , index : true, minLength : 7, required :[true,'Please provide a phone']},
    phoneMobile:{type:String ,index: true, minLength :11, required :[true,'Please provide a phoneNumber']},
    address:{type:String , required :[true,'Please provide a address']},
    nationalCode:{type : String, minLength :7 , maxLength : 10 , required :[true,'Please provide a nationalCode']},
    gender:{type: String, enum: ['MALE', 'FEMALE', 'COMPANY'], default: null, required :[true,'Please provide a gender']},
    otpNumberEmployer:{type : String},
    employerContract :{ type:[Schema.Types.ObjectId] ,ref:'EmployerContract', required : true}
},{
    timestamps : true
})

// hook middleware
employerSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    return next()
})

// create jwt for employer
employerSchema.methods.createTokenEmployer = async function(){
    return await jwt.sign({id :this._id},
        JWT_SECRET,
        {expiresIn:JWT_EXPIRE})
}


module.exports = model('Employer',employerSchema)