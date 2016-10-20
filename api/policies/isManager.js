"use strict";

module.exports = (req, res, next) => {
    if (req.user.role !== 'menadzer') return res.unauthorized(null, {message: 'User is not menadzer!'});
    next();
};
