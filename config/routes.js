"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
    // User
    'GET /v1/users': 'v1/UserController.read',
    'GET /v1/users/refresh_token': 'v1/user/SessionController.refreshToken',
    'POST /v1/users/signup': 'v1/user/RegistrationController.create',
    'POST /v1/users/signin': 'v1/user/SessionController.create',
    'GET /v1/users/:id': 'v1/UserController.read',
    'PUT /v1/users/:id': 'v1/UserController.update',
    'DELETE /v1/users/:id': 'v1/UserController.delete',

    //Documentation
    'GET /v1/doc': 'v1/DocumentationController.getDocumentationJson',
  }
};
