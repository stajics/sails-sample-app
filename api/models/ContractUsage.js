"use strict";

module.exports = {
  schema: true,

  attributes: {

    contract_id: {
      model: 'contract',
      required: true
    },

    usage_date: {
      type: 'datetime',
      defaultsTo: () => new Date()
    },

    comment: {
      type: 'string'
    },

    toJSON() {
      let obj = this.toObject();

      delete obj.password;

      return obj;
    }
  },
};
