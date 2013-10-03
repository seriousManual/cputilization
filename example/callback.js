var sampler = require('../lib/sampler');

sampler({}, function(error, sample) {
    console.log( sample.percentageBusy() );
});