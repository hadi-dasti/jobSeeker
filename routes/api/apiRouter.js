const router = require('express').Router()


// create version1 api
try{
    const v1 = require('./version1/version1Router')
    router.use('/v1',v1)
}catch(err){
    console.log(err)
}





module.exports = router