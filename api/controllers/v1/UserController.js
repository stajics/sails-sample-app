"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */
import { omit, get, isNumber } from 'lodash';

module.exports = {
  read: async(req, res) => {
    try {
      let users = null;
      if( req.params.id ){
        users = await User.findOne({id: req.params.id}).populateAll();
        } else {
        users = await User.find().populateAll();
      }
      res.ok({ users });
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), 'id');
      if( Number.parseInt(req.params.id) ){
        let updatedUser = await User.update({ id: Number.parseInt(req.params.id) }, values);
        if( !updatedUser.length ) {
          return res.notFound("No user with that ID.");
        }
        res.ok({user: updatedUser[0]});
      } else {
        res.badRequest("Invalid user_id.");
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
      if( Number.parseInt(req.params.id) ){
        let deletedUser = await User.destroy({ id: Number.parseInt(req.params.id) });
        if( !deletedUser.length ) {
          return res.notFound("No user with that ID.");
        }
        res.ok({user: deletedUser[0]});
      } else {
        res.badRequest("Invalid user_id.");
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  getShopList: async(req, res) => {
    try {
      let users = await User.find();
      let shops = [req.user.shop];

      if( req.user.role === "super_admin" ) {
        shops = users.map(user => user.shop);
        shops = _.uniq(shops);
      }

      res.ok({ shops });
    } catch (err) {
      res.badRequest(err);
    };
  }
};
