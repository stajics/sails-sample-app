"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    ime: {
      type: 'string',
      required: true,
      alphanumericdashed: true
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    rola: {
      type: 'string',
      enum: ['super_admin', 'menadzer', 'korisnik'],
      defaultsTo: 'korisnik'
    },

    //TODO poslovnica

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
