const express = require("express");
const router = express.Router();
const auth = require('../middlewares/check-auth')
const {refreshToken} = require('../helpers/createToken')
const {userRegister, loginUser, logout, getUser} = require("../controllers/userCtrl")

router.post('/register', userRegister)

router.get('/refresh_token', refreshToken)

router.post('/login', loginUser)

router.get('/check-auth', auth())

router.get('/infor', auth(), getUser)


router.get('/logout', logout)





module.exports = router;