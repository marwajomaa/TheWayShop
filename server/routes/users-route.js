const express = require("express");
const router = express.Router();
const authenticateUser = require('../middlewares/check-auth')
const {userRegister, loginUser, logout} = require("../controllers/userCtrl")

router.post('/register', userRegister)

router.post('/login', loginUser)

router.get('/check-auth', authenticateUser())

router.post('/logout', logout)





module.exports = router;