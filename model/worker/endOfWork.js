const { model,Schema} = require('mongoose')

const endOfWorkSchema = new Schema({
   endOfWork : { type : Boolean , required :[true,'Please provide a endOfWork']},
   startOfWork : {type: Schema.Types.ObjectId , required : true , ref : 'StartOfWork'},
   worker : {type : Schema.Types.ObjectId , required :true, ref:'Worker'},
    workerContract : {type:Schema.Types.ObjectId , required : true , ref:'WorkerContract'}
},{
    timestamps : true
})


module.exports = model('EndOfWork',endOfWorkSchema)