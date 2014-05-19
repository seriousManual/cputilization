# CPUtilization

[![Build Status](https://travis-ci.org/zaphod1984/cputilization.png)](https://travis-ci.org/zaphod1984/cputilization)

[![NPM](https://nodei.co/npm/cputilization.png)](https://nodei.co/npm/cputilization/)

[![NPM](https://nodei.co/npm-dl/cputilization.png?months=3)](https://nodei.co/npm/cputilization/)

## Installation

```
npm install cputilization
```

## Invocation

This modules sample the cpu utilization.
The interface works via callback or event emitter.

### callback interface
use the callback interface if the cpu usage should be sampled only once:

````javascript
var cpuu = require('cputilization');

cpuu(function(error, sample) {
    //returns after 1000ms with the cpu usage of that time interval
    console.log( sample.percentageBusy() );
});
````

supply an options hash to specify the time interval:
````javascript
var cpuu = require('cputilization');

cpuu({timeout: 2000}, function(error, sample) {
    //returns after 2000ms
    console.log( sample.percentageBusy() );
});
````

### event emitter interface
if no callback is supplied the cpu utilization will be sampled continously.

a event emitter is returned than, emits a `sample` event every 1000ms

````javascript
var cpuu = require('cputilization');

var sampler = cpuu();

sampler.on('sample', function(sample) {
    console.log( sample.percentageBusy() );
});
````

an additional options hash can be provided:

- `interval`: the ticking interval, default: 1000ms
- `autoStart`: automatically start the ticker, default: true

````javascript
var cpuu = require('cputilization');

var sampler = cpuu({interval:100, autoStart: false});

sampler.on('sample', function(sample) {
    console.log( sample.percentageBusy() );
});
````

#### start sampling

if the sampler does not start automatically it can be started via the `start` command:

````javascript
var cpuu = require('cputilization');

var sampler = cpuu({autoStart: false, interval:100});

sampler.on('sample', function(sample) {
    //gets executed every 100ms
    console.log( sample.percentageBusy() );
});

sampler.start();
````


#### stop sampling
the returned event emitter features a `stop` method, use that one to stop sampling:

````javascript
var cpuu = require('cputilization');

var sampler = cpuu({interval:100});

sampler.on('sample', function(sample) {
    //gets executed every 100ms
    console.log(sample.percentageBusy());
});

sampler.stop();
````

## CpuSample

An `CpuSample` object is emitted (EventEmitter interface) or returned via tha callback interface.  
The following methods are available:

### percentageBusy()

Returns the average CpuUtilization over the specified sampling interval.

### percentageIdle()

Returns the average Cpu Idle percentage of the specified sampling interval.
