var sampler = require('../');

sampler({timeout: 2000}, function(error, sample) {
    console.log( sample.percentageBusy() );
});

sampler(function(error, sample) {
    console.log( sample.percentageBusy() );
});