"use strict";

const chai = require('chai');
const should = chai.should();
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

describe('controllers:DocumentationController', () => {

  describe(':getDocumentationJson', () => {
    it('Should get documentation.', (done) => {
      request.get(`v1/doc`)
        .send()
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.any.keys('swagger');
          done();
        });
    });
  });
});
