"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

//factories
const userFactory = require('../../factories/UserFactory');

describe('controllers:UserController', () => {
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

  describe(':read', () => {
    it('Should list users.', (done) => {
      request.get(`v1/users`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('users');
          res.body.data.users.length.should.be.above(1);
          done();
        });
    });

    it('Should get error. (not a manager)', (done) => {
      request.get(`v1/users`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.get(`v1/users`)
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


  describe(':update', () => {
    it('Should update user.', (done) => {
      request.put(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          username: "editedUsername",
          ime: "editedIme",
          password: "editedPassword",
          email: "editedEmail@email.com"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user');
          res.body.data.user.should.have.all.keys('id', 'username', 'ime', 'rola', 'email', 'createdAt', 'updatedAt');
          res.body.data.user.username.should.equal('editedUsername');
          res.body.data.user.ime.should.equal('editedIme');
          res.body.data.user.email.should.equal('editedEmail@email.com');
          done();
        });
    });

    it('Should update user. (1 attribute)', (done) => {
      request.put(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          username: "editedUsername"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user');
          res.body.data.user.should.have.all.keys('id', 'username', 'ime', 'rola', 'email', 'createdAt', 'updatedAt');
          res.body.data.user.username.should.equal('editedUsername');
          done();
        });
    });

    it('Should get error. (username in use)', (done) => {
      request.put(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          username: existingUser2.username
        })
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (email in use)', (done) => {
      request.put(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send({
          email: existingUser2.email
        })
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (not a manager)', (done) => {
      request.put(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/users/${existingUser1.id}`)
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


  describe(':delete', () => {
    it('Should delete user.', (done) => {
      request.delete(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('success');
          res.body.data.should.have.all.keys('user');
          res.body.data.user.should.have.all.keys('id', 'username', 'ime', 'rola', 'email', 'createdAt', 'updatedAt');
          done();
        });
    });

    it('Should get error. (can not delete myself)', (done) => {
      request.delete(`v1/users/${existingUser.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (user does not exist)', (done) => {
      request.delete(`v1/users/${existingUser1.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(404)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (user does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete(`v1/users/string`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser.id)}`
        })
        .send()
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (not a manager)', (done) => {
      request.delete(`v1/users/${existingUser.id}`).set({
          'authorization': `Bearer ${userFactory.getToken(existingUser1.id)}`
        })
        .send()
        .expect(401)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error. (no token)', (done) => {
      request.delete(`v1/users/${existingUser1.id}`)
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
