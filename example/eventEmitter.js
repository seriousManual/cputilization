var sampler = require('../');

var a = sampler();

a.on('sample', function(sample) {
    console.log( 'a', sample.percentageBusy() );
});

var b = sampler({interval:100});

b.on('sample', function(sample) {
    console.log( 'b', sample.percentageBusy() );
});