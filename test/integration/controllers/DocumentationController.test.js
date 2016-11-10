/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

describe('controllers:DocumentationController', () => {
  describe(':getDocumentationJson', () => {
    it('Should get documentation.', (done) => {
      request.get('v1/doc')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.any.keys('swagger');
          done();
        });
    });
  });
});
