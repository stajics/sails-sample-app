"use strict";

/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports = {
  policies: {
    "v1/user/SessionController": {
      refreshToken: "isAuthenticated"
    },

    "v1/user/RegistrationController": {
      create: ["isAuthenticated", "isSuperAdmin" ]
    },
    "v1/UserController": {
      read: ["isAuthenticated"],
      update: ["isAuthenticated", "isSuperAdmin" ],
      delete: ["isAuthenticated", "isSuperAdmin" ],
      getShopList: ["isAuthenticated"]
    },

    "v1/NotificationController": {
      create: ["isAuthenticated", "isSuperAdmin" ]
    },

    "v1/ContractController": {
      create: [ "isAuthenticated" ],
      read: ["isAuthenticated" ],
      update: ["isAuthenticated" ],
      delete: ["isAuthenticated", "isSuperAdmin" ]
    },

    "v1/PackageController": {
      create: [ "isAuthenticated", "isSuperAdmin" ],
      read: [ "isAuthenticated",],
      update: [ "isAuthenticated", "isSuperAdmin" ],
      delete: [ "isAuthenticated", "isSuperAdmin" ]
    },

    "v1/ContractUsageController": {
      create: [ "isAuthenticated", "isSuperAdmin" ],
      read: [ "isAuthenticated", "isSuperAdmin" ],
      update: [ "isAuthenticated", "isSuperAdmin" ],
      delete: [ "isAuthenticated", "isSuperAdmin" ]
    }
  }
};
