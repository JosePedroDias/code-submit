'use strict';

/*jshint node:true, esnext:true */

let cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 10000,
    maxExecutionTime   :  1000,
    inspectionInterval :   100
});

let sample = cs.processIO('exercises/ex2/expectedResults')[1];
let _title          = sample[0];
let _args           = sample[1];
let _expectedResult = sample[2];

let rt = 'js';
let code = cs.rf('exercises/ex2/solution.' + rt);

console.log('test name: ' + _title);

cs.run({
    exercise       : 'ex2',
    runtime        : rt,
    code           : code,
    args           : _args,
    expectedResult : _expectedResult,
    onCompletion: function(err, out) {
        if (err) {
            return console.error('\n** ERR **\n' + err);
        }
        return console.log('\n** OUT **\n' + out);
    }
});
