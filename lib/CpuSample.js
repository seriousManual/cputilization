var os = require('os');

var MAGIC_IDLE_CONSTANT = 'idle';

function CpuSample(data) {
    this._cpuData = data || {};
}

CpuSample.sampleCurrent = function() {
    var newSample = new CpuSample();

    os.cpus().forEach(function(cpuData) {
        newSample._addCpuData(cpuData.times);
    });

    return newSample;
};

CpuSample.prototype._addCpuData = function(cpuData) {
    var that = this;

    Object.keys(cpuData).forEach(function(dataKey) {
        that._cpuData[dataKey] = that._cpuData[dataKey] ? that._cpuData[dataKey] + cpuData[dataKey] : cpuData[dataKey];
    });
};

CpuSample.prototype.data = function() {
    return this._cpuData;
};

CpuSample.prototype.diff = function(otherSample) {
    var that = this;
    var otherData = otherSample.data();

    var res = {};
    Object.keys(this._cpuData).forEach(function(dataKey) {
        res[dataKey] = that._cpuData[dataKey] - otherData[dataKey];
    });

    return new CpuSample(res);
};

CpuSample.prototype.percentageBusy = function() {
    var that = this;
    var sumAll = 0, idle;

    Object.keys(this._cpuData).forEach(function(dataKey) {
        var val = that._cpuData[dataKey];

        if(dataKey === MAGIC_IDLE_CONSTANT) {
            idle = val;
        }

        sumAll += val;
    });

    return (sumAll - idle) / sumAll;
};

CpuSample.prototype.percentageIdle = function() {
    return 1 - this.percentageBusy();
};

module.exports = CpuSample;