const mongoose = require('mongoose')
const {MONGODB_URI} = require('../config')


// connect in mongo
const DB = () => {
    mongoose.connect(MONGODB_URI)
        .then(()=> console.log('connect to database'))
        .catch(err=>console.log(err))

}



module.exports = DB





