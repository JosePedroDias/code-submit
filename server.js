'use strict';

/*jshint node:true, esnext:true */

const PORT = 6662;

const fs   = require('fs');
const http = require('http');
const url  = require('url');

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



http.createServer(function(req, res) {
    const u = req.url;

    if (u === '/favicon.ico') {
        res.writeHead(404);
        return res.end();
    }
    
    let o = url.parse(u, true);
    let q = o.query;
    
    var code = '';
    req.on('data', function(data) {
        code += data;
    });
    


    req.on('end', function() {
        code = code.trim();
        
        res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
    
        if (
            (code.length === 0) ||
            !('runtime' in q) ||
            !('args' in q) ||
            !('expectedResult' in q)
        ) {
        res.end( '"Expected POST with code in the body and query string arguments runtime, args and expectedResults"' )
            return;
        }
    
        cs.run({
            code           : code,
            runtime        : q.runtime,
            args           : q.args,
            expectedResult : q.expectedResult,
            onCompletion: function(err, out, stats) {
                var o = {
                    err   : err,
                    out   : out,
                    stats : stats
                };
                
                res.end( JSON.stringify(o) );
            }
        });
    });

}).listen(PORT);

console.log('server running on port %s...', PORT);
