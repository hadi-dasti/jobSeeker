const router = require('express').Router()


try{
    // config on api
    const apiRouter = require('./api/apiRouter')
    router.use('/api',apiRouter)
}catch(err){
    console.log(err)
}


module.exports = router