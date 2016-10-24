"use strict";

import { omit, get, isEmpty } from 'lodash';

module.exports = {
  read: async(req, res) => {
    try {
      let users = null;
      if( req.params.id ){
        users = await User.findOne({id: req.params.id}).populateAll();
        res.ok({ user: users });
        } else {
        users = await User.find().populateAll();
        res.ok({ users });
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'rola']);
      let updatedUser = await User.update({ id: req.params.id }, values);
      if( isEmpty(updatedUser) ) {
        return res.notFound("No user with that ID.");
      }
      res.ok({user: updatedUser[0]});
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
        let userForDelete = await User.findOne({ id: req.params.id });
        if( isEmpty(userForDelete) ) {
          return res.notFound("No user with that ID.");
        }
        if( userForDelete.id === req.user.id ) {
          return res.badRequest("Can't delete urself.");
        }
        await userForDelete.destroy();
        delete userForDelete.password;
        res.ok({user: userForDelete});
    } catch (err) {
      res.badRequest(err);
    };
  },

};
