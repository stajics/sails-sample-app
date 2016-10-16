"use strict";

/**
 * HTTP Server Settings
 * Configuration for the underlying HTTP server in Sails
 */

 var colors = require('colors');
 var moment = require('moment');

module.exports = {
  /**
   * Port where to run this app
   * @type {Number}
   */
  port: 3000,

  /**
   * Your SSL certificates
   * @description They are should be as result of fs.readFileSync() method
   * @type {Object}
   * @example
   * ssl: {
   *    cert: fs.readFileSync('your/path/to/cert.pem'),
   *    key: fs.readFileSync('your/path/to/key.pem')
   * }
   */
  ssl: {
    cert: false,
    key: false
  },

  http: {
    /**
     * This is the options object for the `createServer` method, as discussed here:
     * http://nodejs.org/api/https.html#https_class_https_server
     *
     * @type {Object|Boolean}
     */
    serverOptions: undefined,

    /**
     * You can define own custom middleware here
     * @param app Express application
     */
    customMiddleware: app => {

    },

    /**
     * Configures the middleware function used for parsing the HTTP request body
     * Defaults to the Formidable-based version built into Express/Connect
     *
     * To enable streaming file uploads (to disk or somewhere else)
     * you'll want to set this option to `false` to disable the body parser
     *
     * @type {Function|Boolean|Object}
     */
    bodyParser: undefined,

    /**
     * Express middleware to use for every Sails request
     * @type {Object}
     */
    middleware: {
      /**
       * Middleware for setting Connection: keep-alive to all responses
       */
      keepAlive: (req, res, next) => {
        res.set('Connection', 'keep-alive');
        next();
      },

      requestLogger: (req, res, next) => {
        var requestStartTime = moment().format('M/D/YYYY, HH:mm:ss Z');
        res.on("finish", function() {
          var color = colors.white;
          switch (req.method) {
            case 'GET':
              color = colors.blue;
              break;
            case 'POST':
              color = colors.green;
              break;
            case 'PATCH':
            case 'PUT':
              color = colors.yellow;
              break;
            case 'DELETE':
              color = colors.red;
              break;
            default:

          }
          sails.log.info(color.yellow("|"), color(req.method), req.url, color.yellow("|"), "at [" + requestStartTime + "]", color.yellow("|"), color.cyan('Response:'), 'Status: ' + res.statusCode+ ",", 'Response time: ' + res.get('X-Response-Time'), color.yellow("|"));
        });
        require('response-time')()(req, res, next);
      },
      /**
       * The order in which middleware should be run for HTTP request
       * @type {Array}
       */
      order: [
        'requestLogger',
        'compress',
        'keepAlive',
        'bodyParser',
        '$custom',
        'router',
        '404',
        '500'
      ]
    }
  }
};
