"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */
import { omit } from 'lodash';

module.exports = {
  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id', 'usage_date']);
      let contract = await Contract.find({id: values.contract_id });
      let _package = await Package.find({ id: contract[0].package_id });
      let contractUsages = await ContractUsage.find({ contract_id: values.contract_id });
      let newContractUsage;
      if( _package[0].total_usage > contractUsages.length ) {
        newContractUsage = await ContractUsage.create(values);
      } else {
        return res.badRequest("Number of total usages of the contract reached!");
      }
      res.created({contractUsage: newContractUsage});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let contractUsages = await ContractUsage.find();
      res.ok({ contractUsages });
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      const values = omit(req.allParams(), 'id');
      if( Number.parseInt(req.params.id) ){
        let updatedPackage = await Package.update({ id: Number.parseInt(req.params.id) }, values);
        if( !updatedPackage.length ) {
          return res.notFound("No package with that ID.");
        }
        res.ok({package: updatedPackage[0]});
      } else {
        res.badRequest("Invalid package id.");
      }
    } catch (err) {
      res.badRequest(err);
    };
  },

  delete: async(req, res) => {
    try {
      if( Number.parseInt(req.params.id) ){
        let deletedContractUsage = await ContractUsage.destroy({ id: Number.parseInt(req.params.id) });
        if( !deletedContractUsage.length ) {
          return res.notFound("No contract usage with that ID.");
        }
        res.ok({user: deletedContractUsage[0]});
      } else {
        res.badRequest("Invalid contract usage id.");
      }
    } catch (err) {
      res.badRequest(err);
    };
  }
};
