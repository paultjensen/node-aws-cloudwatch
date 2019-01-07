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

    Cloudwatch.initLog(Config);

    Cloudwatch.describeLogStreams(Config.cloudwatch_log_group_name).then((logStreamAry) => {
        Logger.log.info('Found log streams: ' + JSON.stringify(logStreamAry));
        let nowTs = new Date().getTime();
        let thenTs = nowTs - 10000;
        return Cloudwatch.getLogEvents(Config.cloudwatch_log_group_name, logStreamAry,
            thenTs, nowTs, null);
    }).then((result) => {
        Logger.log.info('Found log events: ' + JSON.stringify(result));
    }).catch((err) => {
        Logger.log.info(JSON.stringify(err));
    });

})();