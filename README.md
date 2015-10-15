# code-submit

After experimenting [codility](https://codility.com/) I thought it would be interesting to replicate the idea.


## Features

* can be invoked locally (check `demo.js`)
* can be invoked remotely via a simple HTTP POST request (check `server.js` and `server-tests/ok.sh`)
* can be used as a web app (serve `webpage.html`, editing the `SERVER` variable to a server instance you run)
* you can host your own problems on public gists like [this one](https://gist.github.com/JosePedroDias/d4c77023c1149a17bf07). just visit the webpage using the gist ID as hash [http://rawgit.com/JosePedroDias/code-submit/master/webpage.html#d4c77023c1149a17bf07].
* supports the following languages:
   * javascript/node.js
   * python
   * C (needs love, crippled!)


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

* C support for printing and asserting, at least for ints, floats and char/int*?
* support for other languages: java, go, lisp, ruby, clojure?
* test process inspector and kill faulty processes (taking too long, using too much memory)
