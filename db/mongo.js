const mongoose = require('mongoose')
const {MONGODB_URI} = require('../config')
const option = {autoIndex : false}

// connect in mongo
const DB = () => {
    mongoose.connect(MONGODB_URI,option)
        .then(()=> console.log('connect to database'))
        .catch(err=>console.log(err))

}



module.exports = DB





