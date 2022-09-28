const {model,Schema}=require('mongoose')

const startOfWorkSchema = new Schema({
    startWork :{type : Boolean , require : [true ,'please a provide startWork']},
    receiveContractAdvancedPayment : {type : Boolean , required : [true ,'please a provide receiveContractAdvancedPayment']},

}, {
        timestamps : true
    })


module.exports = model('StartOfWork',startOfWorkSchema)