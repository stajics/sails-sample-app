"use strict";

const assert = require('chai').assert;
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

describe('controllers:AuthController', () => {
  it('Should list average user expertise ratings', (done) => {
  let req = request.get(`v1/test`).set({
      'authorization': 'asd'
    })
    .send()
    .end(function(err, res) {
      if (err) throw err;
      console.log(res.body);
      done();
    });
  });
});
