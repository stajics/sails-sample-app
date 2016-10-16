"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    price: {
      type: 'float',
      required: true
    },

    total_usage: {
      type: 'integer',
      required: true
    },

    is_active: {
      type: 'boolean',
      defaultsTo: false
    },

    is_europe: {
      type: 'boolean',
      defaultsTo: true
    },

    contracts: {
      collection: 'contract',
      via: 'package_id'
    },

    toJSON() {
      let obj = this.toObject();

      delete obj.password;

      return obj;
    }
  },
};
