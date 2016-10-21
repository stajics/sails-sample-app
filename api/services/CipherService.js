"use strict";

const cipher = require('sails-service-cipher');
const crypto = require('crypto');
const secrets = require('../../config/secrets').secrets;
const algorithm = 'aes-256-ctr';
const password = secrets.hashPassword;

module.exports = {
  jwt: cipher('jwt', {
    secretKey: secrets.jwtSecretKey
  }),

  encrypt: (text) => {
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: (text) => {
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  }
};
