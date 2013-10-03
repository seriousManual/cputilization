# CPUtilization

This modules sample the cpu utilization.
The interface works via callback or event emitter.

## callback
use the callback interface if the cpu usage should be sampled only once:

````javascript
sampler(function(error, sample) {
    //returns after 1000ms with the cpu usage of that time interval
    console.log( sample.percentageBusy() );
});
````

supply an options hash to specify how long the time interval should be:
````javascript
sampler({timeout: 2000}, function(error, sample) {
    //returns after 2000ms
    console.log( sample.percentageBusy() );
});
````

## event emitter
if no callback is supplied the cpu utilization will be sampled continously.

a event emitter is returned than, emits a `sample` event every 1000ms

````javascript
var a = sampler();

a.on('sample', function(sample) {
    console.log( sample.percentageBusy() );
});
````

an additional options hash can be provided to specify the interval:
````javascript
var b = sampler({interval:100});

b.on('sample', function(sample) {
    console.log( sample.percentageBusy() );
});
````

### stop sampling
the returned event emitter features a `stop` method, use that one to stop sampling:

````javascript
var b = sampler({interval:100});

b.on('sample', function(sample) {
    //gets executed every 100ms
    console.log( sample.percentageBusy() );
});

b.stop();
````
