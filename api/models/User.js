module.exports = {
  schema: true,

  attributes: {
    name: {
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

    role: {
      type: 'string',
      enum: ['super_user', 'manager', 'user'],
      defaultsTo: 'user',
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
