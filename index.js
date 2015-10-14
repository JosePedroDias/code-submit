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



    let run = function(opts) {
        let rt = opts.runtime;
        
        let codeTpl = rf('runtimes/' + rt + '/template.' + rt);
        let cmdTpl  = rf('runtimes/' + rt + '/cmd');
        
        
        let codeToRun = codeTpl
        .replace('{{SOLUTION}}', opts.code)
        .replace('{{INPUT}}',    opts.args)
        .replace('{{INPUT}}',    opts.args)
        .replace('{{OUTPUT}}',   opts.expectedResult)
        .replace('{{OUTPUT}}',   opts.expectedResult);
        
        let baseFN = rndBase32();
        let srcFile = [cfg.tmpDir, baseFN, '.' + rt].join('');
        let exeFile = [cfg.tmpDir, baseFN].join('');
        wf(srcFile, codeToRun);
        
        let cmd = cmdTpl
        .replace('{{SRC_FILE}}', srcFile)
        .replace('{{EXE_FILE}}', exeFile)
        .replace('{{EXE_FILE}}', exeFile);
        
        /*console.log('\nabout to run:');
        console.log(cmd);*/
        
        let out = [];
        let err = [];
        
        //let args = cmd.split(' ');
        //let executable = args.shift();
        
        //let proc = cp.spawn(executable, args);
        let proc = cp.exec(cmd);
        
        
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
        
        var onDone = function(err2) {
            clearInterval(inspTimer);
            
            out = out.join('').trim();
            err = err.join('').trim();
            
            opts.onCompletion(err2 || err, out);
        };
        
        
        
        //console.log('\nPID: ' + proc.pid);
        
        proc.stdout.on('data', function(data) {
            out.push(data.toString());
        });
        proc.stderr.on('data', function(data) {
            err.push(data.toString());
        });
        proc.on('error', function(err) {
            onDone(err);
        });
        proc.on('close', function(code) {
            onDone();
        });
    };
    
    
    
    return {
        processIO : processIO,
        rf        : rf,
        run       : run
    };
};
