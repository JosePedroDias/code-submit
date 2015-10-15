'use strict';

/*jshint node:true, esnext:true */

const PORT = 6663;

const http = require('http');
const fs   = require('fs');



let rf = function(fn) {
    return fs.readFileSync(fn).toString();
};



let pageContent = rf('webpage.html');



http.createServer(function(req, res) {
    let u = req.url;
    u = u.substring(1);

    try {
        if (u === '') {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.end(pageContent);
        }

        let text = rf(['exercises', u, 'text.md'].join('/'));
        let expectedResults = rf(['exercises', u, 'expectedResults'].join('/'));

        let out = JSON.stringify({
            text            : text,
            expectedResults : expectedResults
        });

        res.setHeader('Content-Type', 'application/json');
        res.end(out);
    } catch (ex) {
        res.writeHead(404);
        return res.end();
    }
}).listen(PORT);

console.log('server running on port %s...', PORT);
