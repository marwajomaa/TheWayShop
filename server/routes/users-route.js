const express = require("express");
const router = express.Router();
const {authenticateUser} = require('../middlewares/check-auth')
const {userRegister} = require("../controllers/userCtrl")

router.post('/register', userRegister)





module.exports = router;