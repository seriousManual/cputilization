var EventEmitter = require('events').EventEmitter;
var util = require('util');

var CpuSample = require('./CpuSample');


function SampleEmitter(handle) {
    EventEmitter.call(this);

    this._handle = handle;
}

util.inherits(SampleEmitter, EventEmitter);

SampleEmitter.prototype.stop = function() {
    if(this._handle) {
        clearInterval(this._handle);
        this._handle = null;
    }
};

function getUtilization(options, callback) {
    callback = callback || function() {};
    options = options || {};

    var previous;

    var interval = options.interval || 1000;

    var intervalHandle = setInterval(step, interval);
    var sampleEmitter = new SampleEmitter(intervalHandle);

    step();

    function step() {
        var current = CpuSample.sampleCurrent();

        if(previous) {
            var diff = current.diff(previous);

            sampleEmitter.emit('sample', diff);
            callback(null, diff);
        }

        previous = current;
    }

    return sampleEmitter;
}

module.exports = getUtilization;