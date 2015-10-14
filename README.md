# code-submit

After experimenting codility I thought it would be interesting to replicate the idea.
This is the backend.

## Features

* can be invoked locally (check `demo.js`)
* can be invoked remotely via a simple HTTP POST request (check `server-tests/ok.sh`)
* assumes arguments and result as primitve numbers (strings and arrays would be nice)
* supports the following languages:
   * javascript/node.js
   * python
   * C


## Current exercise structure

* Each runtime has a `template` and a `cmd` file.
The former one defines where the several parts expand to a source file,
the latter lists the command to compile and run the source file.
* Each exercise has a `text.md` with its definition and a series of `expectedResults`,
in the form of `title`|`args`|`result`
* The template assumes three sections that will get filled:
    * `{{SOLUTION}}` - a function named solution, provided by the "user"
    * `{{INPUT}}`    - the arguments to invoke the solution with
    * `{{OUTPUT}}`   - the expected result.
    if the function does not return this value,
    an exception will be thrown and text sent to STDERR,
    signalling test failure.


## TODO

* support for strings and arrays as arguments and results
* C support isn't checking correctness just yet
* support for other languages: java, go, lisp, clojure?
* test process inspector and kill faulty processes (taking too long, using too much memory)
* create simple page to serve an editor and submit solutions to it
