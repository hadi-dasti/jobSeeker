const mongoose = require('mongoose')

// config database
const connectDB = () => {
    mongoose.connect(process.env.URI)
        .then(()=> console.log('connect to database'))
        .catch(err=>console.log(err))

}


module.exports = connectDB