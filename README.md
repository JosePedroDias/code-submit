# code-submit

After experimenting [codility.com](https://codility.com/) I thought it would be interesting to replicate the idea.


## Features

* can be invoked locally (check `demo.js`)
* can be invoked remotely via a simple HTTP POST request (check `server.js` and `server-tests/ok.sh`)
* can be used as a web app (serve `webpage.html`, editing the `SERVER` variable to a server instance you run)
* you can host your own problems on public gists like [this one](https://gist.github.com/JosePedroDias/dc913375fe8af2cadf75).
just visit the webpage using the gist ID as hash like [this](http://rawgit.com/JosePedroDias/code-submit/master/webpage.html#dc913375fe8af2cadf75).
* supports the following languages:
   * javascript/node.js
   * python
   * C (in C the solution returning type is assumed to be int)


## runtime definition

* Each runtime has a `template` and a `cmd` file.
The former one defines where the several parts expand to a source file,
the latter lists the command to compile and run the source file.
* The template assumes three sections that will get filled:
    * `{{SOLUTION}}` - a function named solution, provided by the "user"
    * `{{INPUT}}`    - the arguments to invoke the solution with
    * `{{OUTPUT}}`   - the expected result.
    if the function does not return the expected value,
    an exception will be thrown and text sent to STDERR,
    signalling test failure.


## TODO

* support for other languages: java, go, lisp, ruby, clojure (I accept pull requests!)
* kill faulty processes
    * can't kill ongoing process (pid not found, did it fork already and how do I know who to kill then?)
