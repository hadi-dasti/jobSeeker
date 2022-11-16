const {model,Schema} = require('mongoose')


const financialSchema = new Schema({
inventory : {type :String , required :[true,'Please provide a  inventory']},
worker :{type : Schema.Types.ObjectId , required : true, ref : 'Worker'},
workerContract :{type : Schema.Types.ObjectId , required : true, ref :'WorkerContract'}
},{
    timestamps : true
})

module.exports = model('Financial',financialSchema)