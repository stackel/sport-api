'use strict';
module.exports = function(app) {
  var standings = require('../controllers/standingsController');

  // standings Routes
  app.route('/as').get(standings.allsvenskan_standings)
  app.route('/es').get(standings.bandy_elitserien_standings)
};
