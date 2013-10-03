var EventEmitter = require('events').EventEmitter;
var util = require('util');

function SampleEmitter(stopper) {
    EventEmitter.call(this);

    this._stopper = stopper || function() {};
}

util.inherits(SampleEmitter, EventEmitter);

SampleEmitter.prototype.stop = function() {
    this._stopper();
};

module.exports = SampleEmitter;