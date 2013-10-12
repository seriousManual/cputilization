var CpuSample = require('./lib/CpuSample');
var SampleEmitter = require('./lib/SampleEmitter');

function getUtilization(options, callback) {
    var intervalHandle, sampleEmitter, previous;

    if(typeof options === 'function' || typeof callback === 'function') {
        if(!callback) {
            callback = options;
        }
    }

    options = options || {};

    if(!callback) {
        var interval = options.interval || 1000;

        step();

        sampleEmitter = new SampleEmitter(function() {
            clearTimeout(intervalHandle);
        });

        continously(interval);

        return sampleEmitter;
    } else {
        step();
        setTimeout(step, options.timeout || 1000);
    }

    function continously(interval) {
        function runner() {
            var duration = interval - ((new Date()).getMilliseconds() % interval);

            step();

            intervalHandle = setTimeout(runner, duration);
        }

        runner();
    }

    function step() {
        var current = CpuSample.sampleCurrent();

        if(previous) {
            var diff = current.diff(previous);

            if(sampleEmitter) {
                sampleEmitter.emit('sample', diff);
            }

            if(callback) {
                callback(null, diff);
            }
        }

        previous = current;
    }
}

module.exports = getUtilization;