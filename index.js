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

    let handleSpawnArgs = function(cmd) {
        let args = cmd.split(' ');
        let exe = args.shift();
        return {
            exe  : exe,
            args : args
        };
    };

    let noop = function() {};


    let runProcess = function(cmd, out, err, cb) {
        //console.log('\n', cmd);

        let sa = handleSpawnArgs(cmd);
        let proc = cp.spawn(sa.exe, sa.args, {});
        let stats = {
            cpu: [],
            mem: []
        };

        let t0 = new Date().valueOf();

        let kill = function(why) {
            //console.log('killing him!');
            onDone(why);
            onDone = noop;
            proc.kill();
        };

        let onInsp = function() {
            let t = new Date().valueOf();
            let dt = t - t0;

            insp.getMemory(proc.pid, function(err, out) {
                let v = out.vmData;
                if (v === undefined) { return; }
                stats.mem.push({t:dt, v:v});
                if (v > cfg.maxMemory) {
                    kill('mem: process allocated more memory than ' + cfg.maxMemory);
                }
            });

            insp.getCPU(proc.pid, function(err, out) {
                let v = out.sumExecRuntime;
                if (v === undefined) { return; }
                stats.cpu.push({t:dt, v:v});
                if (v > cfg.maxExecutionTime) {
                    kill('cpu: process used more than ' + cfg.maxExecutionTime + ' of CPU execution time');
                }
            });

            console.log('pid:%s, duration:%d ms', proc.pid, dt);

            if (dt > cfg.maxDuration) {
                kill('timeout: process took more than '  + cfg.maxDuration + ' ms');
            }
        };
        onInsp();

        let inspTimer = setInterval(onInsp, cfg.inspectionInterval);

        let onDone = function(err2) {
            clearInterval(inspTimer);

            out = out.join('').trim();
            err = err.join('').trim();

            cb(err2 || err, out, stats);
        };

        proc.stdout.on('data', function(data) {
            out.push( data.toString() );
        });
        proc.stderr.on('data', function(data) {
            err.push( data.toString() );
        });
        proc.on('error', function(err) {
            onDone(err);
        });
        proc.on('close', function(/*code*/) {
            onDone();
        });
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
        
        let cmds = cmdTpl
        .replace('{{SRC_FILE}}', srcFile)
        .replace('{{EXE_FILE}}', exeFile)
        .replace('{{EXE_FILE}}', exeFile).split('\n');
        
        let out = [];
        let err = [];

        let delegateOrReturn = function delegateOrReturn(err_, out_, stats) {
            if (cmds.length > 0) {
                runProcess(cmds.shift(), out, err, delegateOrReturn);
            }
            else {
                opts.onCompletion(err_, out_, stats);
            }
        };

        runProcess(cmds.shift(), out, err, delegateOrReturn);
    };
    
    
    
    return {
        run : run
    };
};
