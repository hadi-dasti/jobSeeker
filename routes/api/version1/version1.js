const router = require('express').Router()

try{

    // route worker
    const workerRouter = require('./worker/workerRouter')
    router.use('/worker',workerRouter)


    // route employer
    const employerRouter = require('./employer/employerRouter')
    router.use('/employer',employerRouter)


    // router admin
    const adminRouter = require('./admin/adminRouter')
    router.use('/admin',adminRouter)


}catch(err){
    console.log(err)
}


module.exports = router