"use strict";

/**
 * UserController
 * @description :: Server-side logic for manage users
 */
import { omit } from 'lodash';

module.exports = {
  create: async(req, res) => {
    try {
      const values = omit(req.allParams(), 'id');
      let newPackage = await Package.create(values);
      res.created({package: newPackage});
    } catch (err) {
      res.badRequest(err);
    };
  },

  read: async(req, res) => {
    try {
      let packages = null;
      if( req.params.id ){
        packages = await Package.findOne({id: req.params.id});
        } else {
        packages = await Package.find();
      }
      res.ok({ packages });
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
        let deletedPackage = await Package.destroy({ id: Number.parseInt(req.params.id) });
        if( !deletedPackage.length ) {
          return res.notFound("No package with that ID.");
        }
        res.ok({user: deletedPackage[0]});
      } else {
        res.badRequest("Invalid package id.");
      }
    } catch (err) {
      res.badRequest(err);
    };
  }
};
