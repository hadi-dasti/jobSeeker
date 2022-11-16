const Employer = require('../../model/employer/Employer')
const {generateOtp} = require('../../utils/otp')

// register employer
exports.registerEmployer = async(req,res)=>{

        const {
            username,
            personality,
            email,
            password,
            phone,
            phoneMobile,
            address,
            nationalCode,
            gender,
        } = req.body;

        try{

        // duplicated  phoneNumber  Employer
        const phoneMobileExit = await Employer.findOne({phoneMobile},{_v : 0})

            if(phoneMobileExit){
                return res.status(400).json({
                    type : false,
                    msg : 'phoneMobile is duplicated'
                })
            }

            // create new employer
        const employers = await Employer.create({

            username,
            personality,
            email,
            password,
            phone,
            phoneMobile,
            address,
            nationalCode,
            gender,
        })

            // save employer
        const employer =  await employers.save()

            if(!employer){
                return res.status(404).json({
                    type :false,
                    msg : "Not found Error"
                })

            }

            //  TODO send SMS to employer

            return res.status(201).json({
                type : true,
                data : {
                    employerId : employer._id
                },
                msg : 'successfully new employer'
            })

    }catch(err){
        console.log(err)
            return res.status(500).json({
                type:false,
                msg : 'Internal Server Error'
            })
    }
}

// login employer with numberMobile
exports.loginEmployer = async(req,res)=>{

    try{
        const {phoneMobile} = req.body;

        const employer = await Employer.findOne({phoneMobile},{ '_v': 0})

        if(!employer){
            return res.status(404).json({
                type : false,
                msg : 'NOT_FOUND_ERR'
            })
        }
        // create otp and send to mobileNumber
        const otp = generateOtp(6)

        employer.otpNumberEmployer = otp

        console.log(otp)

        // todo send OTP

        await employer.save()

        return res.status(200).json({
            type : true,
            data :{
                employerId :employer._id
            },
            msg :'successfully OTP'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            type: false,
            msg : 'Internal Server Error'
        })
    }
}

//verify otp
exports.verifyOtp = async(req,res)=>{
    try{
        const {otp,employerId} = req.body;

        const employer = await Employer.findById({_id: employerId},{'_v':0})

        if(!employer){
            return res.status(404).json({
                type : false,
                msg :'NOT_FOUND_ERR'
            })
        }

        if(employer.otpNumberEmployer !== otp){
            return res.status(400).json({
                type : false,
                msg : 'Bad Request'
            })
        }

        // jwt
        const token = await employer.createTokenEmployer()


        employer.otpNumberEmployer = ""
        await employer.save();

        return res.status(200).json({
            type:true,
            data :{
                token,
                employerId: employer._id
            },
            msg :'successfully login employer'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            type:false,
            msg : 'Internal Server Error'
        })
    }
}