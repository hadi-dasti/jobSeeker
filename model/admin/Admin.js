const {model,Schema}= require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,JWT_EXPIRE} = require('../../config')


const adminSchema = new Schema({
    firstName:{type : String , minLength : 3, index:true, required:[true,'please provide a firstName']},
    lastName:{type :String, minLength: 2, index:true,required:[true,'please provide a lastName']},
    email:{type : String, unique: true , required : [true,'please provide a email']},
    password:{type:String, minLength : 6 , select : false ,required :[true,'please provide a password']},
    phoneNumber:{type:String , minLength : 10, index:true, required:[true,'please provide a phoneNumber']},
    role:{type: String , enum:['MANAGER','ADMIN'],default:'ADMIN', required :[true,'please provide a role']},
    isActive:{type : Boolean , default :false, required :[true,'please provide a isActive']},
    otpMobile :{type:String},
    employer:{type : [Schema.Types.ObjectId], ref:'Employer'},
    worker:{type : [Schema.Types.ObjectId] , ref :'Worker'},
    employerContract: {type : [Schema.Types.ObjectId], ref :'EmployerContract'},
    workerContract :{type :[Schema.Types.ObjectId], ref:'WorkerContract'}

},
    { timestamps : true}
)

// middleware
adminSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
     // hash password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    return next()
})

// compare password
adminSchema.methods.matchPasswords = async function(password){

    return await bcrypt.compare(password,this.password)
}

// create token
adminSchema.methods.createTokenAdmin = async function(){
    return await jwt.sign({id:this._id},
        JWT_SECRET,
        {expiresIn:JWT_EXPIRE})
}

module.exports = model('Admin',adminSchema)