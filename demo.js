'use strict';

/*jshint node:true, esnext:true */

let cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 10000,
    maxExecutionTime   :  1000,
    inspectionInterval :   100
});

cs.run({
    runtime        : 'js',
    code           : 'function solution(a, b) { return a + b; }',
    args           : '2, 3',
    expectedResult : '5',
    onCompletion: function(err, out) {
        if (err) {
            return console.error('\n** ERR **\n' + err);
        }
        return console.log('\n** OUT **\n' + out);
    }
});
