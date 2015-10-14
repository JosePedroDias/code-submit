'use strict';

/*jshint node:true, esnext:true */

let cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 10000,
    maxExecutionTime   :  1000,
    inspectionInterval :   100
});

let sample = cs.processIO('exercises/ex1/expectedResults')[1];

console.log('test name: ' + sample[0]);
cs.run('ex1', 'exercises/ex1/solution.js', sample[1], sample[2]); // OK
//cs.run('ex1', 'exercises/ex1/solution2.js', sample[1], sample[2]); // FAILS
