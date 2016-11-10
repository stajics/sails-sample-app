module.exports.secrets = {
  hashPassword: process.env.HASH_PASSWORD,  // required
  // required (or defaults to new secret every server restart)
  jwtSecretKey: process.env.CHIPHER_JWT_SECRET_KEY || require('node-uuid').v4(), // eslint-disable-line

  // db
  ip: process.env.GREENAUTO_MYSQL_IP || '172.17.0.1',
  dbPassword: process.env.GREENAUTO_DB_PASSWORD || '',
};

/*
Example from .bashrc:
export CHIPHER_JWT_SECRET_KEY=some_string
export HASH_PASSWORD=some_string
*/
