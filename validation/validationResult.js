const {validationResult} = require('express-validator')

exports.validationError = async(req,res,next)=>{
    try{
        const errors = await validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success : false,
                msg: errors.array()
            })
        }
        console.log(errors)
        return next()
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : 'Internal Server Error'
        })
    }
}