const  Worker = require('../../model/worker/Worker')




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
        otpSource,
        roleWorker,
        password,
    } = req.body;

    // duplicated phone worker
        const duplicatedPhoneWorker =  await Worker.find({mobileNumber})

        if(duplicatedPhoneWorker.length){
            return res.status(400).json({
                success : false,
                msg :'شماره موبایل وارد شده تکراری میباشد دوباره امتحان کنید'
            })
        }

        // create worker
        const workers = await Worker.create({

            fName,
            lName,
            gender,
            address,
            socialSecurityNumber,
            phone,
            otpSource,
            mobileNumber,
            roleWorker,
            password,
        })

        const newWorkers = await workers.save();

        if(!newWorkers){
           return res.status(404).json({
               success : false,
               msg : 'worker not found'
           })
        }

        return res.status(201).json({
            success : true,
             data :{newWorkers},
            msg : ' create worker successfully'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            msg :'Internal Server Error'
        })
    }
}