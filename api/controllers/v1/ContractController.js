"use strict";

import { omit } from 'lodash';

module.exports = {
  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      values.user_id = req.user.id;
      values.contract_number = await Contract.generateContractNumber();
      let newContract = await Contract.create(values);
      await Contract.incriseContractNumber();
      res.created({contract: newContract});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let contracts = [];
      if( req.params.id ){
        contracts = await Contract.findOne({id: req.params.id});
        } else {
        contracts = await Contract.find();
      }

      if( req.user.role === "shop_admin" ) {
        let myShopUsers = await User.find({shop: req.user.shop});
        let myShopUsersIds = myShopUsers.map(user => user.id);
        contracts = contracts.filter(contract => myShopUsersIds.includes(contract.user_id));
      }

      if( req.user.role === "user" ) {
        contracts = contracts.filter(contract => {
          let isOwner = contract.user_id === req.user.id;
          if (req.user.is_europe) {
            return isOwner || contract.is_europe;
          } else {
            return isOwner;
          }
        });    
      }


      res.ok({ contracts });
    } catch (err) {
      res.badRequest(err);
    };
  },

  update: async(req, res) => {
    try {
      let values = omit(req.allParams(), ['id', 'user_id']);
      if( Number.parseInt(req.params.id) ) {
        let contract = await Contract.find({ id: Number.parseInt(req.params.id) });
        if( !contract.length ) {
          return res.notFound("No contract with that ID.");
        }

        let contractOwner = await User.find({id: contract.user_id});
        if( req.user.role === "super_admin" ) {
          let updatedContract = await Contract.update({ id: Number.parseInt(req.params.id) }, values);
          return res.ok({contract: updatedContract[0]});
        }

        values = omit(values, ['package_id', 'active']);

        if( req.user.role === "shop_admin" &&  contractOwner.shop === req.user.shop) {
          let updatedContract = await Contract.update({ id: Number.parseInt(req.params.id) }, values);
          return res.ok({contract: updatedContract[0]});
        }

        if( req.user.role === "user" &&  contract.user_id === req.user.id) {
          let updatedContract = await Contract.update({ id: Number.parseInt(req.params.id) }, values);
          return res.ok({contract: updatedContract[0]});
        }

        res.unauthorized("Unauthorized to change that contract.");
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
        let deletedContract = await Contract.destroy({ id: Number.parseInt(req.params.id) });
        if( !deletedContract.length ) {
          return res.notFound("No contract with that ID.");
        }
        res.ok({contract: deletedContract[0]});
      } else {
        res.badRequest("Invalid package id.");
      }
    } catch (err) {
      res.badRequest(err);
    };
  }
};
