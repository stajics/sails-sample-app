module.exports = {
  schema: true,

  attributes: {
    ime: {
      type: 'string',
      required: true,
      alphanumericdashed: true,
    },

    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true,
    },

    password: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'email',
      unique: true,
      required: true,
    },

    rola: {
      type: 'string',
      enum: ['super_admin', 'menadzer', 'korisnik'],
      defaultsTo: 'korisnik',
    },

    toJSON() {
      const obj = this.toObject();

      delete obj.password;

      return obj;
    },
  },

  /* eslint no-param-reassign: 'off'*/
  beforeCreate(values, next) {
    if (!values.password) {
      return next();
    }
    values.password = CipherService.encrypt(values.password);
    return next();
  },

  beforeUpdate(values, next) {
    if (!values.password) {
      return next();
    }
    values.password = CipherService.encrypt(values.password);
    return next();
  },
};
