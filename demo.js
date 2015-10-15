'use strict';

/*jshint node:true, esnext:true */

let cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 10000, // not yet in use
    maxExecutionTime   :  1000, // not yet in use
    maxDuration        :  1000,
    inspectionInterval :   100
});

// those sleeps are there to test process killing, something which isn't working

cs.run({
    runtime        : 'js',
    code           : 'function solution(a, b) { return a + b; }',

    //runtime        : 'py',
    //code           : 'import time\ndef solution(a, b): time.sleep(20); return a + b',

    //runtime        : 'c',
    //code           : 'int solution(int a, int b) { sleep(2); return a + b; }',

    args           : '2, 3',
    expectedResult : '5',
    onCompletion: function(err, out) {
        if (err) {
            return console.error('\n** ERR **\n' + err);
        }
        return console.log('\n** OUT **\n' + out);
    }
});
