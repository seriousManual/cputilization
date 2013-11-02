var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var util = require('./util');

describe('integration', function() {
   var clock;

    before(function() {
        clock = sinon.useFakeTimers();
    });

    after(function() {
        clock.restore();
    });

    it('should tick tick after 1000ms', function(done) {
        var cpu = sandboxed.require('../index', {
            requires: {
                './lib/CpuSample': util.makeSample(100)
            }
        });

        cpu(function(error, sample) {
            expect(error).to.be.null;
            expect(sample).to.equal(100);

            done();
        });

        clock.tick(1000);
    });

    it('should tick tick multiple times', function(done) {
        var cpu = sandboxed.require('../index', {
            requires: {
                './lib/CpuSample': util.makeSample(100)
            }
        });

        var e = cpu({interval: 100});

        var cb = sinon.spy(function(sample) {
            expect(sample).to.equal(100);
        });

        e.on('sample', cb);

        clock.tick(1000);

        expect(cb.callCount).to.equal(9);

        done();
    });

    it('should tick tick multiple times, no autostart', function(done) {
        var cpu = sandboxed.require('../index', {
            requires: {
                './lib/CpuSample': util.makeSample(100)
            }
        });

        var e = cpu({autoStart:false, interval: 100});

        var cb = sinon.spy();

        e.on('sample', cb);

        clock.tick(1000);

        expect(cb.callCount).to.equal(0);

        done();
    });

    it('should tick tick multiple times, no autostart, start, stop', function(done) {
        var cpu = sandboxed.require('../index', {
            requires: {
                './lib/CpuSample': util.makeSample(100)
            }
        });

        var e = cpu({autoStart:false, interval: 100});

        var cb = sinon.spy();

        e.on('sample', cb);

        clock.tick(1000);
        expect(cb.callCount).to.equal(0);

        e.start();
        clock.tick(1000);
        expect(cb.callCount).to.equal(10);

        e.stop();
        clock.tick(1000);
        expect(cb.callCount).to.equal(10);

        done();
    });

});