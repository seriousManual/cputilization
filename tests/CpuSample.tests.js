var expect = require('chai').expect;

var CpuSample = require('../lib/CpuSample');

var mySample;

describe('CpuSample', function() {

    it('should add up data', function() {
        var a = new CpuSample();

        a.addCpuData({a:1, b:2});
        a.addCpuData({a:3, b:4});

        var expected = {a:4, b:6};
        expect(a._cpuData).to.deep.equal(expected);
        expect(a.data()).to.deep.equal(expected);
    })

    it('should diff data', function() {
        var a = new CpuSample();

        a.addCpuData({a:1, b:2});
        a.addCpuData({a:3, b:4});

        var b = new CpuSample();

        b.addCpuData({a:10, b:20});
        b.addCpuData({a:30, b:40});

        var expected = {a:36, b:54};
        expect(b.diff(a).data()).to.deep.equal(expected);
    })

    it('should percentage busy', function() {
        var a = new CpuSample();

        a.addCpuData({idle:1, foo:1});

        expect(a.percentageBusy()).to.deep.equal(0.5);
        expect(a.percentageIdle()).to.deep.equal(0.5);
    })

})