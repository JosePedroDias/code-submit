# code-submit

After experimenting codility I thought it would be interesting to replicate the idea.
This is the backend.


## Current exercise structure

* Each runtime has a `template` and a `cmd` file.
The former one defines where the several parts expand to a source file,
the latter lists the command to compile and run the source file.
* Each exercise has a `text.md` with its definition and a series of `expectedResults`,
in the form of `title`|`args`|`result`


## TODO

* Provide examples in languages other than JS/Node.js runtime
* test process inspector and kill faulty processes
