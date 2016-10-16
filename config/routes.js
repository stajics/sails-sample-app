"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports = {
  routes: {
    // User
    'POST /v1/users/signup': 'v1/user/RegistrationController.create',
    'PUT /v1/users/:id': 'v1/UserController.update',
    'GET /v1/users': 'v1/UserController.read',
    'DELETE /v1/users/:id': 'v1/UserController.delete',
    'POST /v1/users/signin': 'v1/user/SessionController.create',
    'GET /v1/users/refresh_token': 'v1/user/SessionController.refreshToken',
    'GET /v1/get-shop-list': 'v1/UserController.getShopList',

    //notification
    'POST /v1/notifications': 'v1/NotificationController.create',
    //contract
    'GET /v1/contracts/:id': 'v1/ContractController.read',
    'GET /v1/contracts': 'v1/ContractController.read',
    'POST /v1/contracts': 'v1/ContractController.create',
    'PUT /v1/contracts/:id': 'v1/ContractController.update',
    'DELETE /v1/contracts/:id': 'v1/ContractController.delete',
    //contractUsage
    'POST /v1/contract-usages': 'v1/ContractUsageController.create',
    'DELETE /v1/contract-usages/:id': 'v1/ContractUsageController.delete',
    'GET /v1/contract-usages': 'v1/ContractUsageController.read',
    //package
    'GET /v1/packages': 'v1/PackageController.read',
    'POST /v1/packages': 'v1/PackageController.create',
    'PUT /v1/packages/:id': 'v1/PackageController.update',
    'DELETE /v1/packages/:id': 'v1/PackageController.delete',
    //Documentation
    'GET /v1/doc': 'v1/DocumentationController.getDocumentationJson',
  }
};
