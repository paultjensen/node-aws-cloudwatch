/* Cloudwatch Data Access
 * index.js
 *
 * Purpose: Provides functions for Cloudwatch using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';
    let Aws = require('aws-sdk');

    let _cw = null;
    let cloudwatch = {};

    cloudwatch.initLog =  function(config) {
        Aws.config.update({region: config.cloudwatch_region});
        _cw = new Aws.CloudWatchLogs();
    };

    cloudwatch.describeLogStreams = function(logGroupName) {
        let params = {
            logGroupName: logGroupName
        };

        return new Promise(function(resolve, reject) {
            _cw.describeLogStreams(params, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result && result.logStreams) {
                        let logStreamNames = [];
                        result.logStreams.forEach ((logStream) => {
                            logStreamNames.push(logStream.logStreamName);
                        });
                        resolve(logStreamNames);
                    } else {
                        resolve([]);
                    }
                }
            });
        });

    };

    cloudwatch.getLogEvents = function(logGroupName, logStreamAry, startTimeMs, endTimeMs, nextToken) {
        return new Promise(function (resolve, reject) {
            let params = {
                logGroupName: logGroupName,
                endTime: endTimeMs,
                filterPattern: '',
                interleaved: true,
                limit: 100,
                logStreamNames: logStreamAry,
                startTime: startTimeMs,
                nextToken: nextToken
            };

            let events = [];

            _cw.filterLogEvents(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (data) {
                        for (let j = 0; j < data.events.length; j++) {
                            events.push(data.events[j].message);
                        }
                        if (data.nextToken == null || data.nextToken.length === 0) {
                            resolve(events);
                        } else {
                            cloudwatch.getLogEvents(logGroupName, logStreamAry, startTimeMs, endTimeMs, data.nextToken);
                        }
                    } else {
                        resolve([]);
                    }
                }
            });
        });
    };

    module.exports = {cloudwatch: cloudwatch};

})();