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

});