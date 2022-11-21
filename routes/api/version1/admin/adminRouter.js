const router = require('express').Router()

const {registerAdmin,loginAdmin,verifyAdmin} = require('../../../../controller/admin/adminController')


// register admin
router.post('/register',registerAdmin)

// login admin
router.post('/admin_login',loginAdmin)

// verify otp
router.post('/admin_verify',verifyAdmin)





module.exports = router