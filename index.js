/* Cloudwatch Data Access
 * index.js
 *
 * Purpose: Provides example functions for Cloudwatch using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';

    let Cloudwatch = require('./lib/cloudwatch').cloudwatch;
    let Config = require('./lib/config').config;
    let Logger = require('./lib/logger');

    Cloudwatch.initLogs(Config);


})();