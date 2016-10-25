"use strict";

/**
 * Connections API Configuration
 *
 * Connections are like "saved settings" for your adapters.
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 *
 * NOTE: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 */
const secrets = require('./secrets').secrets;

module.exports = {
  connections: {
    /**
     * MySQL configuration
     * @type {Object}
     */
    mysql: {
      adapter: 'sails-mysql',
      host: process.env.GREENAUTO_MYSQL_PORT_3306_TCP_ADDR,
      port: 3306,
      user: 'root',
      password: secrets.dbPassword,
      database: 'greenauto_development',
      charset: 'utf8',
      collation: 'utf8_swedish_ci'
    },

    test: {
      adapter: 'sails-mysql',
      host: process.env.GREENAUTO_MYSQL_PORT_3306_TCP_ADDR,
      port: 3306,
      user: 'root',
      password: secrets.dbPassword,
      database: 'greenauto_test',
      charset: 'utf8',
      collation: 'utf8_swedish_ci'
    },
  }
};
