/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should();  // eslint-disable-line
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../../factories/UserFactory');

describe('controllers:RegistrationController', () => {
  let existingUser = null;
  before((done) => {
    Promise.all([
      userFactory.createManager(),
      userFactory.create(),
      userFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      done();
    });
  });

  describe(':create', () => {
    it('Should signin.', (done) => {
      request.post('v1/users/signin')
        .send({
          username: existingUser.username,
          password: 'password',
        })
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user', 'token');
          res.body.data.user.should.have.all.keys('id', 'username', 'ime', 'rola', 'email', 'createdAt', 'updatedAt');
          done();
        });
    });

    it('Should get error (bad password).', (done) => {
      request.post('v1/users/signin')
        .send({
          username: existingUser.username,
          password: 'badPassword',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (bad username)', (done) => {
      request.post('v1/users/signin')
        .send({
          username: 'notexisting',
          password: 'password',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (missing parameter)', (done) => {
      request.post('v1/users/signin')
        .send({
          password: 'password',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data', 'message');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (missing body)', (done) => {
      request.post('v1/users/signin')
        .send()
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data', 'message');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':refreshToken', () => {
    it('Should refresh token.', (done) => {
      request.get('v1/users/refresh_token').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('user', 'token');
        res.body.data.user.should.have.all.keys('id', 'username', 'ime', 'rola', 'email', 'createdAt', 'updatedAt');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.get('v1/users/refresh_token')
        .send()
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });
});
