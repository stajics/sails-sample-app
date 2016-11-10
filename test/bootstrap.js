const Sails = require('sails');
const config = require('../config/env/test');

let sails;

before((done) => {
  process.env.NODE_ENV = 'test';
  Sails.lift(config, (error, server) => {
    if (error) return done(error);

    sails = server;
    return done();
  });
});

after(done => sails.lower(done));
