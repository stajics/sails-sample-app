

import { omit } from 'lodash';

module.exports = {
  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'rola', 'poslovnica']);
      const newUser = await User.create(values);
      res.created({ user: newUser, token: CipherService.jwt.encodeSync({ id: newUser.id }) });
    } catch (err) {
      res.badRequest(err);
    }
  },
};
