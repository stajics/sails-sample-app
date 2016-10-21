"use strict";

module.exports.secrets = {
  jwtSecretKey: process.env.CHIPHER_JWT_SECRET_KEY || require('node-uuid').v4(),  //required (or defaults to new secret every server restart)
  hashPassword: process.env.HASH_PASSWORD  //required
}

/*
Example from .bashrc:
export CHIPHER_JWT_SECRET_KEY=some_string
export HASH_PASSWORD=some_string
*/
