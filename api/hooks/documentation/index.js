"use strict";

/**
 * https://github.com/tjwebb/sails-swagger
 */

const _ = require('lodash');
const express = require('express');

module.exports = sails => {
  return {
    defaults(overrides) {
      this.bindExplorerRoute();
    },

    initialize(cb) {
      cb();
    },

    bindExplorerRoute() {
      let originalCustomMiddleware = _.get(sails.config, 'http.customMiddleware');
      let customMiddleware = app => {
        app.use('/documentation',express.static(process.cwd() + '/documentationExplorer'));
        if (_.isFunction(originalCustomMiddleware)) {
          originalCustomMiddleware(app);
        }
      };
      _.set(sails.config, 'http.customMiddleware', customMiddleware);
    }

  };
};
