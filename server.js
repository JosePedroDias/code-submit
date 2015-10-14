'use strict';

/*jshint node:true, esnext:true */

const PORT = 6662;

const http = require('http');
const url  = require('url');

let cs = require('./index')({
    tmpDir             : '/tmp/code-submit/',
    maxMemory          : 10000,
    maxExecutionTime   :  1000,
    inspectionInterval :   100
});



http.createServer(function(req, res) {
    let u = req.url;

    if (u === '/favicon.ico') {
        res.writeHead(404);
        return res.end();
    }
    
    let o = url.parse(u, true);
    //let p = o.pathname;
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
            !('exercise' in q) ||
            !('runtime' in q) ||
            !('args' in q) ||
            !('expectedResult' in q)
        ) {
        res.end( '"Expected POST with code in the body and query string arguments exercise, runtime, args and expectedResults"' )
            return;
        }
    
        cs.run({
            code           : code,
            exercise       : q.exercise,
            runtime        : q.runtime,
            args           : q.args,
            expectedResult : q.expectedResult,
            onCompletion: function(err, out) {
                var o = {
                    err : err,
                    out : out
                };
                
                res.end( JSON.stringify(o) );
            }
        });
    });

}).listen(PORT);

console.log('server running on port %s...', PORT);
