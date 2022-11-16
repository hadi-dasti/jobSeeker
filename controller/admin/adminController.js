const Admin = require('../../model/admin/Admin')
const {generateOtp} = require('../../utils/otp')


// register admin
exports.registerAdmin = async (req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            // role,
            isActive,
        } = req.body


        // check duplicate ADMIN
        const adminExist = await Admin.find({email,phoneNumber})
        if(adminExist){
            return res.status(400).json({
                success : false,
                msf : 'ALREADY_ADMIN_EXISTS_ERR'
            })

        }

        // create admin
        const createAdmin = await Admin.create({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            role : phoneNumber ? 'MANAGER':'ADMIN',
            isActive,
        })
        // save admin
        const admin = await createAdmin.save()

        if(!admin){
            return res.status(404).json({
                success : false,
                msg  : 'NOT_FOUND_ADMIN'
            })
        }

        return res.status(201).json({
            success : true,
            data: {
                adminId : admin._id
            },
            msg : 'Created ADMIN'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : 'Internal Server Error'
        })
    }
}

// login admin
exports.loginAdmin = async(req,res)=>{

        const {phoneNumber,password} = req.body;
    try{

        if(!phoneNumber || !password){
            return res.status(400).json({
                success : false,
                msg :'pleas provide an phoneNumber and password'
            })
        }

        const admin = await Admin.findOne({phoneNumber}).select('+password')
        if(!admin){
            return res.status(404).json({
                success : false,
                msg : "invalid Error"
            })
        }

        // match password
        const isMatch = await admin.matchPasswords(password)
        if(!isMatch){
            return res.status(404).json({
                success : false,
                msg : 'invalid password'
            })
        }

        //create otp
        const otp = generateOtp(6)
        admin.phoneNumber = otp;
        await admin.save()
        console.log(otp)

        // todo send otp

         return res.status(200).json({
             success : true,
             data :{
                 adminId : admin._id
             },
             msg : 'ok login admin with otp'
         })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg : 'Internal Server Error'
        })
    }
}