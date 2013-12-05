var Ticker = require('ptic');

var CpuSample = require('./lib/CpuSample');
var SampleEmitter = require('./lib/SampleEmitter');

function getUtilization(options, callback) {
    var sampleEmitter, previous;

    if(typeof options === 'function' || typeof callback === 'function') {
        if(!callback) {
            callback = options;
        }
    }

    options = options || {};

    if(!callback) {
        var interval = options.interval || 1000;
        var autoStart = options.autoStart !== undefined ? options.autoStart : true;

        var ticker = new Ticker(interval, autoStart);

        ticker.on('tick', step);

        sampleEmitter = new SampleEmitter(ticker.start.bind(ticker), ticker.stop.bind(ticker));

        return sampleEmitter;
    } else {
        step();
        setTimeout(step, options.timeout || 1000);
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
