const { verify } = require('jsonwebtoken');
const boom = require('boom');

const { getUserById } = require('./../queries/users');

module.exports = () => (req, res, next) => {
  const { cookies } = req;

  if (!cookies || !cookies.token) {
    return next(boom.unauthorized('no credentials'));
  }

  return verify(cookies.token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // if not valid send unauthorized error
    if (err) {
      res.clearCookie('token');
      return next(boom.unauthorized('credentials are not valid'));
    }

    // get the user  Id from token
    const { id } = decoded;
    return getUserById(id, true)
      .then(user => {
        // put the user info in the req to be accessed in the next middlewares
        req.user = user;
      })
      .catch(() => next(boom.badImplementation()));
  }).catch(() => next(boom.badImplementation()));
};