const mongoose = require('mongoose')
const {MONGODB_URI} = require('../config')

//config database
const connectDB = () => {
    mongoose.connect(MONGODB_URI)
        .then(()=> console.log('connect to database'))
        .catch(err=>console.log(err))

}



module.exports = connectDB