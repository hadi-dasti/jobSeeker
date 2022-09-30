const {model,Schema}=require('mongoose')

const startOfWorkSchema = new Schema({
    startWork :{type : Boolean , require : [true ,'please  provide a startWork']},
    receiveContractAdvancedPayment : {type : Boolean , required : [true ,'please  provide a receiveContractAdvancedPayment']},
    contractAdvancedPayment : {type : String , index : true, required : [true,'please  provide a contractAdvancedPayment']},
    workerContract : {type :Schema.Types.ObjectId , required : true, ref :'WorkerContract'}
}, {
        timestamps : true
    })


module.exports = model('StartOfWork',startOfWorkSchema)