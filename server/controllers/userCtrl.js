const Users = require('../models/userModel')
const httpError = require('../middlewares/http-error')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res, next) => {
    try {
       const { name, email, password } = req.body;

       const user = await Users.findOne({email});

       if (user) return next(new httpError('The email already exists'), 400)


       if(password.length < 6) {
           return next(new httpError('Password is at least 6 characters long'))
       }

       //password encryption
       const hashedPassword = await bcrypt.hash(password, 10)

       const newUser = new Users({name, email, password:hashedPassword})
       
      //save to mongodb
      await newUser.save()
      
      //create token 
      const accesstoken =  createAccessToken({id: newUser._id})
      const refreshToken =  createRefreshToken({id: newUser._id})
      
      res.cookie('refreshtoken', refreshtoken, {
          httpOnly: true,
          path: 'user/refresh_token'
      })

       res.json({ 
           status: 'success',
           msg: 'User has been successfully registered',
           user: newUser,
           token: accesstoken
       })
     

    } catch (err) {
        return next(new httpError('Something went wrong, please try again'), 500)
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

exports.refreshToken = (req, res, next) => {
    try{
    const rf_token = req.cookies.refreshtoken;

    if(!rf_token) return next(new httpError('Please login or register'), 400) 
    
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user, next) => {
        if(err) return next(new httpError('Please login or register'), 500)

        const accessToken = createAccessToken({id: user.id})

        res.json({accessToken})
    })
    
    } catch (err) {
        return next(new httpError(err.message), 500)
    }
}