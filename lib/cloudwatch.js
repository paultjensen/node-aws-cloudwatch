/* Cloudwatch Data Access
 * index.js
 *
 * Purpose: Provides functions for Cloudwatch using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';
    let Aws = require('aws-sdk');
    let Logger = require('../lib/logger');

    let _cw = null;
    let cloudwatch = {};

    cloudwatch.initLogs =  function(config) {
        Aws.config.update({region: config.cloudwatch_region});
        _cw = new Aws.CloudWatchLogs();
    };

    module.exports = {cloudwatch: cloudwatch};

})();