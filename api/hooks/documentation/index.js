/* eslint  import/no-extraneous-dependencies: 'off'*/
const _ = require('lodash');
const express = require('express');

module.exports = sails => ({
  defaults(overrides) {
    this.bindExplorerRoute();
  },

  initialize(cb) {
    cb();
  },

  bindExplorerRoute() {
    const originalCustomMiddleware = _.get(sails.config, 'http.customMiddleware');
    const customMiddleware = (app) => {
      app.use('/documentation', express.static(`${process.cwd()}/documentationExplorer`));
      if (_.isFunction(originalCustomMiddleware)) {
        originalCustomMiddleware(app);
      }
    };
    _.set(sails.config, 'http.customMiddleware', customMiddleware);
  },
});
