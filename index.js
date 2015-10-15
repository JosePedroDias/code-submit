module.exports = function(cfg) {

    'use strict';

    /*jshint node:true, esnext:true */

    let fs = require('fs');
    let cp = require('child_process');
    //let insp = require('proc-process-inspector'); // TODO reenable once in use



    let rndBase32 = function() {
        return ( ~~(Math.random() * Math.pow(32, 6)) ).toString(32);
    };

    let rf = function(fn) {
        return fs.readFileSync(fn).toString();
    };

    let wf = function(fn, contents) {
        fs.writeFileSync(fn, contents);
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
        
        let out = [];
        let err = [];

        let proc = cp.exec(cmd);
        let t0 = new Date().valueOf();

        let kill = function() { // TODO FIX
            //console.log('killing him!');
            //proc.kill('SIGHUP'); // SIGHUP, SIGKILL...
            //onDone('timeout');
        };
        
        let onInsp = function() {
            /*insp.getMemory(proc.pid, function(err, out) {
                console.log(err, out);
            });

            insp.getCPU(proc.pid, function(err, out) {
                console.log(err, out);
            });*/

            let t = new Date().valueOf();
            let dt = t - t0;
            console.log('pid:%s, duration:%d ms', proc.pid, dt);

            if (dt > cfg.maxDuration) {
                kill();
            }
        };
        onInsp();

        let inspTimer = setInterval(onInsp, cfg.inspectionInterval);

        let onDone = function(err2) {
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
        run : run
    };
};
