module.exports = function(cfg) {

    'use strict';

    /*jshint node:true, esnext:true */

    let fs = require('fs');
    let cp = require('child_process');
    let insp = require('proc-process-inspector');



    let rndBase32 = function() {
        return ( ~~(Math.random() * Math.pow(32, 6)) ).toString(32);
    };

    let rf = function(fn) {
        return fs.readFileSync(fn).toString();
    };

    let wf = function(fn, contents) {
        fs.writeFileSync(fn, contents);
    };

    let processIO = function(fn) {
        let s = rf(fn);
        let o, result = [];
        s.split('\n').forEach(function(line, i) {
            var iMod3 = i % 3;
            if (iMod3 === 0) {
                o = [line, undefined];
            }
            else {
                o[iMod3] = line;
                if (iMod3 === 2) {
                    result.push(o);
                }
            }
        });
        return result;
    };

    let codeTpl = rf('exercises/template.js');
    let cmdTpl  = rf('exercises/cmd.js');

    let run = function(exDir, solutionFn, inputS, outputS) {
        let solutionS = rf(solutionFn);
        
        let codeToRun = codeTpl
        .replace('{{SOLUTION}}', solutionS)
        .replace('{{INPUT}}',    inputS)
        .replace('{{INPUT}}',    inputS)
        .replace('{{OUTPUT}}',   outputS);
        
        /*console.log('\n** CODE **');
        console.log(codeToRun);*/
        
        let fileToRun = [cfg.tmpDir, rndBase32(), '.js'].join('');
        wf(fileToRun, codeToRun);
        
        let nodeBinaryFn = '/usr/local/bin/node';
        
        let cmd = cmdTpl
        .replace('{{SRC_FILE}}', fileToRun);
        
        console.log('\nabout to run:');
        console.log(cmd);
        
        let out = [];
        let err = [];
        let args = cmd.split(' ');
        let executable = args.shift();
        let proc = cp.spawn(executable, args);
        
        
        
        var onInsp = function() {
            insp.getMemory(proc.pid, function(err, out) {
                console.log(err, out);
            });            
            insp.getCPU(proc.pid, function(err, out) {
                console.log(err, out);
            });
        };
        onInsp();
        
        var inspTimer = setInterval(onInsp, cfg.inspectionInterval);
        
        
        
        console.log('\nPID: ' + proc.pid);
        
        proc.stdout.on('data', function(data) {
            out.push(data.toString());
        });
        proc.stderr.on('data', function(data) {
            err.push(data.toString());
        });
        proc.on('error', function(err) {
            clearInterval(inspTimer);
        
            console.log('ERROR', err);
        });
        proc.on('close', function(code) {
            clearInterval(inspTimer);
            
            console.log('\nRETURN CODE: ' + code);
            
            //if (code !=== 0) {
                // TODO
            //}
            
            out = out.join('').trim();
            err = err.join('').trim();
            
            if (out) {
                console.log('\n** OUT: **');
                console.log( out );
            }

            if (err) {
                console.log('\n** ERR: **');
                console.log( err );
            }
        });
    };
    
    
    
    return {
        processIO : processIO,
        run       : run
    };
};
