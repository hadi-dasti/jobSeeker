const router = require('express').Router()

try{
    // config routes worker
    const workerRouter = require('./worker/workerRouter')
    router.use('/worker',workerRouter)

}catch(err){
    console.log(err)
}





module.exports = router