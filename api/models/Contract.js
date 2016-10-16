"use strict";

/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    contract_number: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true
    },

    jmbg: {
      type: 'numeric',
      required: true
    },

    phone_number: {
      type: 'numeric',
      required: true
    },

    address: {
      type: 'string',
      required: true
    },

    licence_plate: {
      type: 'string',
      required: true
    },

    vehicle: {
      type: 'string',
      required: true
    },

    vehicle_type: {
      type: 'string',
      required: true
    },

    chassie_number: {
      type: 'string',
      required: true
    },

    length: {
      type: 'numeric',
      required: true
    },

    active: {
      type: 'boolean',
      defaultsTo: false
    },

    expiration_date: {
      type: 'datetime',
      required: true
    },

    is_europe: {
      type: 'boolean',
      defaultsTo: false
    },

    user_id: {
      model: 'user',
      required: true
    },

    package_id: {
      model: 'package',
      required: true
    },

    contractsUsages: {
      collection: 'contractUsage',
      via: 'contract_id'
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
    }
  },

  generateContractNumber: async() => {
    let today = new Date();
    let year = today.getFullYear();
    let contractCount = await ContractCount.findOne({id: 1});
    if(!contractCount){
      contractCount = await ContractCount.create({id: 1});
    }
    return `${year}/${contractCount[year] + 1}`;
  },

  incriseContractNumber: async() => {
    let today = new Date();
    let year = today.getFullYear();
    let contractCount = await ContractCount.findOne({id: 1});
    await ContractCount.update({id: 1}, {[year]: contractCount[year] + 1});
  }
};
