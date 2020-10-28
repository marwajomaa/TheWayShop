const { verify } = require('jsonwebtoken');
const boom = require('boom');

const { getUserById } = require('./../queries/users');

module.exports = () => (req, res, next) =>{
    try {
        const cookies = req.cookies ? (req.cookies) : {};
        console.log(cookies.token)
        if(!cookies.token) return res.status(400).json({msg: "Invalid Authentication"})

        verify(cookies.token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication"})

            req.user = user
            console.log(user)
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}