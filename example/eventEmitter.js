var sampler = require('../lib/sampler');

var a = sampler();

a.on('sample', function(sample) {
    console.log( sample.percentageBusy() );
});