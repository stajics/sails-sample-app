"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    name: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    role: {
      type: 'string',
      enum: ['super_admin', 'shop_admin', 'user'],
      defaultsTo: 'user'
    },

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    is_europe: {
      type: 'boolean',
      defaultsTo: false
    },

    shop: {
      type: 'string',
      required: true
    },

    contracts: {
      collection: 'contract',
      via: 'user_id'
    },

    notifications: {
      collection: 'notification',
      via: 'user_id'
    },

    toJSON() {
      let obj = this.toObject();

      delete obj.password;

      return obj;
    }
  },

  beforeCreate(values, next) {
    if (!values.hasOwnProperty('password')) {
      return next();
    }
    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  },

  beforeUpdate(values, next) {
    if (!values.hasOwnProperty('password')) {
      return next();
    }
    return HashService.bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};
