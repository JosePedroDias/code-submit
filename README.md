# code-submit

After experimenting [codility](https://codility.com/) I thought it would be interesting to replicate the idea.


## Features

* can be invoked locally (check `demo.js`)
* can be invoked remotely via a simple HTTP POST request (check `server.js` and `server-tests/ok.sh`)
* can be used as a web app (gotta run both the `server.js` and `webserver.js`, then visit <http://127.0.0.1:6663/#equi>)
* supports the following languages:
   * javascript/node.js
   * python
   * C (needs love, crippled!)


## Current exercise structure

* Each runtime has a `template` and a `cmd` file.
The former one defines where the several parts expand to a source file,
the latter lists the command to compile and run the source file.
* Each exercise has a `text.md` with its definition and a series of `expectedResults`,
in the form of `title`\n`args`\n`result`
* The template assumes three sections that will get filled:
    * `{{SOLUTION}}` - a function named solution, provided by the "user"
    * `{{INPUT}}`    - the arguments to invoke the solution with
    * `{{OUTPUT}}`   - the expected result.
    if the function does not return the expected value,
    an exception will be thrown and text sent to STDERR,
    signalling test failure.


## TODO

* C support for printing and asserting, at least for ints, floats and char/int*?
* support for other languages: java, go, lisp, ruby, clojure?
* test process inspector and kill faulty processes (taking too long, using too much memory)
* create simple page to serve an editor and submit solutions to it
