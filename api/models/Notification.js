"use strict";

module.exports = {
  schema: true,

  attributes: {

    user_id: {
      model: 'user',
      required: true
    },

    seen: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },

    message: {
      type: 'string',
      required: true
    },
    
    title: {
      type: 'string',
      required: true
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  },
};
