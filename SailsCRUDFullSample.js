//***********************************************************
//*********models/Box.js
//********************************************************
// Box, box, Boxes, boxes
// Add Box to globals in eslint
module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true,
      alphanumericdashed: true,
    },

    toJSON() {
      const obj = this.toObject();
      return obj;
    },
  },

};

//***********************************************************
//*********controllers/BoxController.js
//********************************************************

import { omit, isEmpty } from 'lodash';

module.exports = {

  create: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const newBox = await Box.create(values);
      res.created({ box: newBox });
    } catch (err) {
      res.badRequest(err);
    }
  },

  read: async (req, res) => {
    try {
      let boxes = null;
      if (req.params.id) {
        boxes = await Box.findOne({ id: req.params.id });
        res.ok({ box: boxes });
      } else {
        boxes = await Box.find();
        res.ok({ boxes });
      }
    } catch (err) {
      res.badRequest(err);
    }
  },

  update: async (req, res) => {
    try {
      const values = omit(req.allParams(), ['id']);
      const updatedBox = await Box.update({ id: req.params.id }, values);
      if (isEmpty(updatedBox)) {
        return res.notFound('No box with that ID.');
      }
      return res.ok({ box: updatedBox[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

  delete: async (req, res) => {
    try {
      const boxForDelete = await Box.destroy({ id: req.params.id });
      if (isEmpty(boxForDelete)) {
        return res.notFound('No box with that ID.');
      }
      return res.ok({ box: boxForDelete[0] });
    } catch (err) {
      return res.badRequest(err);
    }
  },

};



//***********************************************************
//*********config/routes.js
//********************************************************
'GET /v1/boxes': 'v1/BoxController.read',
'GET /v1/boxes/:id': 'v1/BoxController.read',
'POST /v1/boxes': 'v1/BoxController.create',
'PUT /v1/boxes/:id': 'v1/BoxController.update',
'DELETE /v1/boxes/:id': 'v1/BoxController.delete',

//***********************************************************
//*********config/policies.js
//********************************************************
'v1/BoxController': {
  create: ['isAuthenticated', 'isSuperUser'],
  read: ['isAuthenticated', 'isSuperUser'],
  update: ['isAuthenticated', 'isSuperUser'],
  delete: ['isAuthenticated', 'isSuperUser'],
},

//***********************************************************
//*********test/factories/BoxFactory.js
//********************************************************
const _ = require('lodash');

const boxAttributes = ['id', 'name', 'createdAt', 'updatedAt'];

const create = (values = {}) => {
  const randomNumber = _.random(1, 100000);
  return Box.create({
    name: `name${randomNumber}`,
  });
};

module.exports = {
  boxAttributes,
  create,
};

//***********************************************************
//*********test/integration/controllers/BoxController.test.js
//********************************************************
//Requires userFactory and required policies to exist.
/* eslint import/no-extraneous-dependencies: 'off' */
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars
const url = 'http://localhost:3000/';
const request = require('supertest')(url);

// factories
const userFactory = require('../../factories/UserFactory');
const boxFactory = require('../../factories/BoxFactory');

describe('controllers:BoxController', () => {
  let existingUser = null;
  let existingUser1 = null;
  let existingBox = null;
  before((done) => {
    Promise.all([
      userFactory.createSuperUser({ poslovnica: 1 }),
      userFactory.createManager({ poslovnica: 1 }),
      boxFactory.create(),
    ]).then((objects) => {
      existingUser = objects[0];
      existingUser1 = objects[1];
      existingBox = objects[2];
      done();
    })
    .catch(done);
  });

  describe(':create', () => {
    it('Should create new box.', (done) => {
      request.post('v1/boxes').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        name: 'name',
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.box.should.have.all.keys(boxFactory.boxAttributes);
        res.body.data.box.name.should.equal('name');
        done();
      });
    });

    it('Should get error (missing token).', (done) => {
      request.post('v1/boxes')
        .send({
          name: 'name',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.all.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });

    it('Should get error (user is not super_user).', (done) => {
      request.post('v1/boxes').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        name: 'name',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });


    it('Should get error (missing parameter).', (done) => {
      request.post('v1/boxes').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error (missing body).', (done) => {
      request.post('v1/boxes').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });
  });

  describe(':read', () => {
    it('Should list boxes.', (done) => {
      request.get('v1/boxes').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('boxes');
        res.body.data.boxes.length.should.be.above(0);
        done();
      });
    });

    it('Should list 1 box.', (done) => {
      request.get(`v1/boxes/${existingBox.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('box');
        res.body.data.box.should.have.all.keys(boxFactory.boxAttributes);
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.get('v1/boxes').set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.get('v1/boxes')
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


  describe(':update', () => {
    it('Should update box.', (done) => {
      request.put(`v1/boxes/${existingBox.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send({
        name: 'updatedIme',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('box');
        res.body.data.box.should.have.all.keys(boxFactory.boxAttributes);
        res.body.data.box.name.should.equal('updatedIme');
        done();
      });
    });

    it('Should get error. (not a super_admin)', (done) => {
      request.put(`v1/boxes/${existingBox.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send({
        name: 'updatedIme',
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.put(`v1/boxes/${existingUser1.id}`)
        .send({
          name: 'updatedIme',
        })
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          res.body.should.have.keys('status', 'data');
          res.body.status.should.equal('fail');
          done();
        });
    });
  });


  describe(':delete', () => {
    it('Should delete box.', (done) => {
      request.delete(`v1/boxes/${existingBox.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.all.keys('status', 'data');
        res.body.status.should.equal('success');
        res.body.data.should.have.all.keys('box');
        res.body.data.box.should.have.all.keys(boxFactory.boxAttributes);
        done();
      });
    });

    it('Should get error. (box does not exist)', (done) => {
      request.delete(`v1/boxes/${existingBox.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (box does not exist) (will error code 400 becouse id is string (key is int in db))', (done) => {
      request.delete('v1/boxes/string').set({
        authorization: `Bearer ${userFactory.getToken(existingUser.id)}`,
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (not a super_user)', (done) => {
      request.delete(`v1/boxes/${existingUser.id}`).set({
        authorization: `Bearer ${userFactory.getToken(existingUser1.id)}`,
      })
      .send()
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.keys('status', 'data');
        res.body.status.should.equal('fail');
        done();
      });
    });

    it('Should get error. (no token)', (done) => {
      request.delete(`v1/boxes/${existingUser1.id}`)
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

//#######################################################
//Documentation
//#######################################################
//paths
########################################
#######BOX
  /boxes:
    get:
      security:
        - Bearer: []
      tags:
        - Box
      summary: Get all boxes.
      description: "Requires logged in user to be super_user."
      operationId: getBoxes
      consumes:
        - application/json
      produces:
        - application/json
      responses:
        "200":
          description: All boxes.
          schema:
            $ref: "#/definitions/BoxResponse"
    post:
      security:
        - Bearer: []
      tags:
        - Box
      summary: Add new box.
      description: "Requires logged in user to be super_user."
      operationId: createBox
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Box object that needs to be added to the boxes.
          required: true
          schema:
            $ref: "#/definitions/PostBoxesBody"
      responses:
        "201":
          description: Box created.
          schema:
            $ref: "#/definitions/BoxesResponse"
  /boxes/{id}:
    get:
      security:
        - Bearer: []
      tags:
        - Box
      summary: Get box.
      description: "Requires logged in user to be super_user."
      operationId: getBox
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the box
          required: true
          type: string
      responses:
        "200":
          description: All users.
          schema:
            $ref: "#/definitions/BoxesResponse"
    put:
      security:
        - Bearer: []
      tags:
        - Box
      summary: Update box.
      description: "Requires logged in user to be super_user."
      operationId: updateBox
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the box that needs to be updated
          required: true
          type: string
        - in: body
          name: body
          description: Attributes and values that will be updated.
          required: true
          schema:
            $ref: "#/definitions/PutBoxesBody"
      responses:
        "200":
          description: Box updated.
          schema:
            $ref: "#/definitions/BoxesResponse"

    delete:
      security:
        - Bearer: []
      tags:
        - Box
      summary: Delete box.
      description: "Requires logged in user to be super_user."
      operationId: deleteUser
      consumes:
        - application/json
      produces:
        - application/json
      parameters:
        - in: path
          name: id
          description: ID of the box that needs to be deleted.
          required: true
          type: string
      responses:
        "200":
          description: Box deleted.
          schema:
            $ref: "#/definitions/BoxesResponse"

//#####################################################
//definitions: models
Box:
  type: object
  required:
    - id
    - name
    - createdAt
    - updatedAt
  properties:
    id:
      type: string
    name:
      type: string
    createdAt:
      type: string
    updatedAt:
      type: string

//#############################################################
//definitions: params

###############
#Box
PostBoxesBody:
  type: object
  required:
    - name
  properties:
    name:
      type: string

PutBoxesBody:
  type: object
  properties:
    name:
      type: string

//#############################################################
//definitions: responses
###################
#Box
  BoxResponse:
    type: object
    required:
      - status
      - data
    properties:
      status:
        type: string
        enum: ['success']
      data:
        type: object
        required:
          - boxes
        properties:
          boxes:
            type: 'array'
            items:
              $ref: "#/definitions/Box"

  BoxesResponse:
    type: object
    required:
      - status
      - data
    properties:
      status:
        type: string
        enum: ['success']
      data:
        type: object
        required:
          - box
        properties:
          box:
            $ref: "#/definitions/Box"
