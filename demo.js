'use strict';

/*jshint node:true, esnext:true */

let cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 10000,
    maxExecutionTime   :  1000,
    inspectionInterval :   100
});

//let rt = 'js';
//let rt = 'c';
let rt = 'py';

let sample = cs.processIO('exercises/ex1/expectedResults')[1];

console.log('test name: ' + sample[0]);
cs.run('ex1', rt, 'exercises/ex1/solution.' + rt, sample[1], sample[2]); // OK
//cs.run('ex1', rt, 'exercises/ex1/solution2.' + rt, sample[1], sample[2]); // FAILS
