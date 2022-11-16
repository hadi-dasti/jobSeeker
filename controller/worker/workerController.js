const Worker = require('../../model/worker/Worker')
const {generateOtp} =require('../../utils/otp')

// register worker
exports.registerWorker = async(req,res)=>{

    try{

    const {
        fName ,
        lName,
        gender,
        address,
        socialSecurityNumber,
        phone,
        mobileNumber,
        roleWorker,
        password,
    } = req.body;

    // duplicated mobileNumber worker
        const duplicatedMobileNumberWorker =  await Worker.find({mobileNumber})

        if(duplicatedMobileNumberWorker.length){
            return res.status(400).json({
                success : false,
                msg :'شماره موبایل وارد شده تکراری میباشد دوباره امتحان کنید'
            })
        }

        // create worker
        const createWorker = await Worker.create({
            fName,
            lName,
            gender,
            address,
            socialSecurityNumber,
            phone,
            mobileNumber,
            roleWorker,
            password,
        })

        const worker = await createWorker.save();

        if(!worker){
            return res.status(404).json({
               success : false,
               msg : 'worker not found'
           })
        }

            //TODO  SEND SMS TO CUSTOMER

       return res.status(201).json({
            success : true,
            data :{
                workerId : worker._id
            },
            msg : ' create REGISTER worker successfully'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'Internal Server Error'
        })
    }
}


// login worker with otp mobileNumber
exports.loginWorker = async(req,res)=>{

    try{
            const {mobileNumber} = req.body;

            const worker = await Worker.findOne({mobileNumber})

        if(!worker) {
             return  res.status(400).json({
                    success : false,
                    msg :'mobileNumber_not_found_ERR'
                });
        }

        // generate otp
        let otp = generateOtp(6)

        worker.mobileOtp = otp ;
        console.log(otp)

        await worker.save();

        //todo => send otp to mobile for login

        return res.status(200).json({
            success : true,
            data :{
                workerId : worker._id
            },
            msg: "OTP send to mobileNumber"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'Internal Server Error'
        })
    }
}

//verify oto and send to worker
exports.verifyOtpWorker = async(req,res)=>{

    try{
        const {otp,workerId} = req.body

        const worker = await Worker.findById({ _id:workerId})

        if(!worker){
            return res.status(404).json({
                success : false,
                msg : 'workerId not found'
            })
        }
        // match otp
        if(worker.mobileOtp !== otp){
            return res.status(400).json({
                success : false,
                msg:"Bad Request"
            })
        }

        // jwt
        const token = await worker.createToken()

        worker.mobileOtp = ""
        await worker.save()

        return res.status(200).json({
            success:true,
            data :{
                token,
                workerId : worker._id
            },
            msg :"successfully verify worker with otpMobile"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :"Internal Server Error"
        })
    }
}


exports.verifyWorker = async(req,res,)=>{
    try{
        res.json('ok test')
    }catch(err){
        console.log(err)
    }
}