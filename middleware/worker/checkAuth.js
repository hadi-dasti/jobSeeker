const router = require('express').Router();
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')
// const Worker = require('../../model/worker/Worker')



router.use(async(req,res,next)=>{


    const token = req.headers.token

    if(!token){
        return res.status(401).json({
            success : false,
            msg  : " not authorized to access this route"
        })
    }
    try{

        const decode = await jwt.verify(token,JWT_SECRET)

        if(!decode){
            return res.status(403).json({
                success : false,
                msg :'Access is denied'
            })
        }

        // const worker = await Worker.findById({id:decode})
        //
        // if(!worker){
        //     return res.status(404).json({
        //         success :false,
        //         msg : 'not worker found with this id'
        //     })
        // }

    return next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : "Internal Server Error"
        })
    }
})

module.exports = router;