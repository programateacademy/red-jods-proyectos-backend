const express = require('express')
const router = express.Router()
//const {validateCreate}=require('../../validators/logins');
const { loginCtrl, registerCtrl } = require('../../controller/loginController')

// localhost:3000/Api/v1/ligin/
router.post('/', loginCtrl)

// localhost:3000/Api/v1/ligin/register/
router.post('/register', registerCtrl)


module.exports = router
