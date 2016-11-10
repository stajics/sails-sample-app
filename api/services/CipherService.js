const cipher = require('sails-service-cipher');
const crypto = require('crypto');
const secrets = require('../../config/secrets').secrets;

const algorithm = 'aes-256-ctr';
const password = secrets.hashPassword;

module.exports = {
  jwt: cipher('jwt', {
    secretKey: secrets.jwtSecretKey,
  }),

  encrypt: (text) => {
    const newCipher = crypto.createCipher(algorithm, password);
    let crypted = newCipher.update(text, 'utf8', 'hex');
    crypted += newCipher.final('hex');
    return crypted;
  },

  decrypt: (text) => {
    const decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  },

};
