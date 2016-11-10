import { omit, isEmpty } from 'lodash';

module.exports = {
  read: async (req, res) => {
    try {
      let users = null;
      if (req.params.id) {
        users = await User.findOne({ id: req.params.id }).populateAll();
        res.ok({ user: users });
      } else {
        users = await User.find().populateAll();
        res.ok({ users });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'rola']);
      const updatedUser = await User.update({ id: req.params.id }, values);
      if (isEmpty(updatedUser)) {
        return res.notFound('No user with that ID.');
      }
      return res.ok({ user: updatedUser[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const userForDelete = await User.findOne({ id: req.params.id });
      if (isEmpty(userForDelete)) {
        return res.notFound('No user with that ID.');
      }
      if (userForDelete.id === req.user.id) {
        return res.badRequest('Can\'t delete urself.');
      }
      await userForDelete.destroy();
      delete userForDelete.password;
      return res.ok({ user: userForDelete });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};
