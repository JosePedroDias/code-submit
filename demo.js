'use strict';

/*jshint node:true, esnext:true */

const fs = require('fs');

try {
    fs.mkdirsync('/tmp/code-submit/');
} catch (ex) {}

const cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 1000000000, // 100 MB?
    maxExecutionTime   :       1000, // 1 s
    maxDuration        :      10000, // 10 s cpu
    inspectionInterval :        250  // 4 fps
});

// those sleeps are there to test process killing, something which isn't working

cs.run({
    //runtime        : 'js',
    //code           : 'function solution(a, b) { return a + b; }',

    //runtime        : 'py',
    //code           : 'import time\ndef solution(a, b): time.sleep(20); return a + b',

    runtime        : 'c',
    code           : 'int solution(int a, int b) { sleep(); return a + b; }',

    args           : '2, 3',
    expectedResult : '5',
    onCompletion: function(err, out, stats) {
        if (err) {
            return console.error('\n** ERR **\n' + err, stats);
        }
        return console.log('\n** OUT **\n' + out, stats);
    }
});
