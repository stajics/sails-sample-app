"use strict";

/**
 * Configuration file where you can store error codes for responses
 *
 * It's just a storage where you can define your custom API errors and their description.
 * You can call then in your action res.ok(data, sails.config.errors.USER_NOT_FOUND);
 */

module.exports = {
  errors: {
    USER_NOT_FOUND: {
      data: 'User with specified credentials is not found'
    }
  }
};
