"use strict";

import { omit, isInteger } from 'lodash';

module.exports = {
  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), 'id');
      values.user_id = Number.parseInt(values.user_id) || 0;
      values.seen = false;
      let user = await User.findOne({id: values.user_id});
      if(!user){
        return res.badRequest("No user with that id.")
      }
      let newNotification = await Notification.create(values);
      res.created({notification: newNotification});
    } catch (err) {
      res.badRequest(err);
    };
  }
};
