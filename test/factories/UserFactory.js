const _ = require('lodash');

const userAttributes = ['id', 'username', 'name', 'role', 'email', 'createdAt', 'updatedAt'];

const create = () => {
  const randomNumber = _.random(1, 1000000);
  return User.create({
    username: `username${randomNumber}`,
    name: `name${randomNumber}`,
    password: 'password',
    email: `email${randomNumber}@email.com`,
  });
};

const createSuperUser = () => {
  const randomNumber = _.random(1, 1000000);
  return User.create({
    username: `username${randomNumber}`,
    name: `name${randomNumber}`,
    password: 'password',
    role: 'super_user',
    email: `email${randomNumber}@email.com`,
  });
};

const createManager = () => {
  const randomNumber = _.random(1, 1000000);
  return User.create({
    username: `username${randomNumber}`,
    name: `name${randomNumber}`,
    password: 'password',
    role: 'manager',
    email: `email${randomNumber}@email.com`,
  });
};

const getToken = id => CipherService.jwt.encodeSync({ id });

module.exports = {
  create,
  createSuperUser,
  createManager,
  getToken,
  userAttributes,
};
