"use strict";

/**
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 * @param {Function} cb This function should always be called, so DON'T REMOVE IT
 */
const CronJob = require('cron').CronJob;
module.exports = {
  bootstrap: cb => {
    let today = new Date();
    new CronJob('00 10 00 * * *', function() {
      console.log('Checking expired contracts at ' + today);
      Contract.find().then(contracts => {
        contracts.map(contract => {
          if(contract.expiration_date < today) {
            contract.active = false;
            contract.save();
          }
        });
      })
    }, null, true, 'Europe/Berlin');
    cb();
  }
};
