module.exports = (req, res, next) => {
  if (req.user.role !== 'super_user') {
    return res.unauthorized(null, {
      data: {
        message: 'User is not super user!',
      },
    });
  }
  return next();
};
