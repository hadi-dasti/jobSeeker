const router = require('express').Router()

try{
    // config router admin
    const adminRouter = require('./admin/admin')
    router.use('/admin',adminRouter)

    // config router contractors
    const contractorRouter = require('./contractors/contractors')
    router.use('/contractors',contractorRouter)

    // config router employer
    const employerRouter = require('./employer/employer')
    router.use('/employer',employerRouter)

    // config router worker
    const workerRouter = require('./worker/worker')
    router.use('/worker',workerRouter)

}catch(err){
    console.log(err)
}





module.exports = router