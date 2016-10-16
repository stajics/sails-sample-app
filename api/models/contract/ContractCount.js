"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {

    2016: {
      type: 'integer',
      defaultsTo: 0
    },

    2017: {
      type: 'integer',
      defaultsTo: 0
    },

    2018: {
      type: 'integer',
      defaultsTo: 0
    },

    2019: {
      type: 'integer',
      defaultsTo: 0
    },

    2020: {
      type: 'integer',
      defaultsTo: 0
    },

    2021: {
      type: 'integer',
      defaultsTo: 0
    },

    2022: {
      type: 'integer',
      defaultsTo: 0
    },

    2023: {
      type: 'integer',
      defaultsTo: 0
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  },
};
