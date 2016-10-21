const _ = require('lodash');

const create = () => {
  let randomNumber = _.random(1,1000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    password: 'password',
    email: `email${randomNumber}@email.com`
  });
};

const createSuperUser = () => {
  let randomNumber = _.random(1,100000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    password: 'password',
    rola: 'super_user',
    email: `email${randomNumber}@email.com`
  });
};

const createManager = () => {
  let randomNumber = _.random(1,1000);
  return User.create({
    username: `username${randomNumber}`,
    ime: `ime${randomNumber}`,
    password: 'password',
    rola: 'menadzer',
    email: `email${randomNumber}@email.com`
  });
};

const getToken = (id) => {
  return CipherService.jwt.encodeSync({id});
};

module.exports = {
  create,
  createSuperUser,
  createManager,
  getToken
};
