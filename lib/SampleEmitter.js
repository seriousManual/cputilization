var EventEmitter = require('events').EventEmitter;
var util = require('util');

function SampleEmitter(starter, stopper) {
    EventEmitter.call(this);

    this._starter = starter || function() {};
    this._stopper = stopper || function() {};
}

util.inherits(SampleEmitter, EventEmitter);

SampleEmitter.prototype.stop = function() {
    this._stopper();
};

SampleEmitter.prototype.start = function() {
    this._starter();
};

module.exports = SampleEmitter;