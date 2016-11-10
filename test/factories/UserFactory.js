const _ = require('lodash');

const create = () => {
  const randomNumber = _.random(1, 1000000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    password: 'password',
    email: `email${randomNumber}@email.com`,
  });
};

const createSuperUser = () => {
  const randomNumber = _.random(1, 1000000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    password: 'password',
    rola: 'super_user',
    email: `email${randomNumber}@email.com`,
  });
};

const createManager = () => {
  const randomNumber = _.random(1, 1000000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    password: 'password',
    rola: 'menadzer',
    email: `email${randomNumber}@email.com`,
  });
};

const getToken = id => CipherService.jwt.encodeSync({ id });

module.exports = {
  create,
  createSuperUser,
  createManager,
  getToken,
};
