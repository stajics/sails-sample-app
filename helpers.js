//*******************************************************************
//*******************************************************************
//*******************************************************************
//TEST EXAMPLE
//*******************************************************************
//*******************************************************************
"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../factories/UserFactory');

describe('controllers:RegistrationController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingUser2 = null;
  before(done => {
    Promise.all([
      userFactory.createManager(),
      userFactory.create(),
      userFactory.create(),
    ]).then(objects => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingUser2 = objects[2];
      done();
    });
  });

  describe(':refreshToken', () => {
    it('Should refresh token.', (done) => {
      request.get(`v1/users/refresh_token`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user', 'token');
          res.body.data.user.should.have.all.keys('id', 'username', 'ime', 'rola', 'email', 'createdAt', 'updatedAt');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.get(`v1/users/refresh_token`)
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });
});
