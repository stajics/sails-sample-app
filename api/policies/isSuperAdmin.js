"use strict";

module.exports = (req, res, next) => {
    if (req.user.role !== 'super_admin') return res.unauthorized(null, {message: 'User is not super admin!'});
    next();
};
