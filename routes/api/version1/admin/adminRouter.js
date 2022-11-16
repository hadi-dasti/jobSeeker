const router = require('express').Router()

const {registerAdmin,loginAdmin} = require('../../../../controller/admin/adminController')


// register admin
router.post('/register',registerAdmin)

// login admin
router.post('/login',loginAdmin)





module.exports = router