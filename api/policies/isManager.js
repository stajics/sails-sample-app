module.exports = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.unauthorized(null, {
      data: {
        message: 'User is not manager!',
      },
    });
  }
  return next();
};
