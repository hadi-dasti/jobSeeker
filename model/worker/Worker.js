const {model,Schema}= require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET,JWT_EXPIRE} = require('../../config')


const workerSchema = new Schema({
    fName :{type: String, required :[true,'Please provide a fName']},
    lName :{type : String,required :[true ,'Please provide a lName']},
    gender:{type:String, enum :['MALE','FEMALE'], required:[true,'Please provide a gender']},
    address :{type : String , required :[true,'Please provide a address']},
    socialSecurityNumber:{ type:String, index:true, minLength:9 , required :[true,'Please Provide a socialSecurityNumber']},
    phone : {type :String, minLength: 7, required :[true,'Please provide a phone']},
    mobileOtp:{type:String },
    mobileNumber:{type :String, minLength :9 , maxLength :11, index :true, required :[true,'Please provide a mobileNumber']},
    roleWorker:{type :String, enum :['SIMPLE','SPECIAL'],required :[true,'Please provide a roleWorker']},
    password :{type :String , minLength : 6, select : false , required : [true,'Please provide a password']},
    financial :{type : Schema.Types.ObjectId ,ref :'Financial'}

},
    {timestamps :true}
)

// hook  middleware
 workerSchema.pre('save',async function(next){
        if(!this.isModified('password')){
            next()
        }
// hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next()
})

// sign token
workerSchema.methods.createToken = async function(){
          return await jwt.sign({id:this._id},
              JWT_SECRET,
                {expiresIn:JWT_EXPIRE})
}

module.exports = model('Worker',workerSchema)
