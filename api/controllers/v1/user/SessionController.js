import _ from 'lodash';
import Passport from 'passport';

module.exports = {
  create: async (req, res) => {
    Passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  refreshToken: (req, res) => { // eslint-disable-line
    return res.ok({
      user: req.user,
      token: CipherService.jwt.encodeSync({ id: req.user.id }),
    });
  },
};
