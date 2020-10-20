const Users = require('../models/userModel')
const httpError = require('../middlewares/http-error')
const bcrypt = require('bcrypt')

const {createAccessToken} = require('../helpers/createToken')

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
      const token =  createAccessToken({id: newUser._id, email: newUser.email})

      res.cookie('token', token, {
          maxAge: 30,
          httpOnly: true,
        });

       res.json({ 
           status: 'success',
           msg: 'User has been successfully registered',
           user: newUser,
           token
       })
     

    } catch (err) {
        console.log(err);
        return next(new httpError('Something went wrong, please try again'), 500)
    }
}

