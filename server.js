const express = require('express')
require('dotenv').config()


//config
const {PORT,NODE_ENV} = require('./config')


// routes
const workerRouter = require('./routes/routes')

// require db
const DB = require('./db/mongo')

// start mongodb
DB()

// start app
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// log in development environment
if( NODE_ENV === 'development'){
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

// routes middleware
app.use('/', workerRouter)




// start api
app.listen(PORT,() => console.log(`start api on ${PORT}`))











