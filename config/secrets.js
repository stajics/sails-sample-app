"use strict";

module.exports.secrets = {
  jwtSecretKey: process.env.CHIPHER_JWT_SECRET_KEY || require('node-uuid').v4()  //required (or defaults to new secret every server restart)
}
