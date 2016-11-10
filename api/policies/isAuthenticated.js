const passport = require('passport');

/* eslint no-param-reassign: 'off'*/
module.exports = (req, res, next) => {
  passport.authenticate('jwt', (error, user, info) => {
    if (error || !user) return res.unauthorized(error || info);

    req.user = user;

    return next();
  })(req, res);
};
