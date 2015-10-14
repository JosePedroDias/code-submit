import sys

{{SOLUTION}}

inputS = '{{INPUT}}'
expectedS = '{{OUTPUT}}'
expected  = eval(expectedS)

try:
    result  = solution({{INPUT}})
    resultS = repr(result)
    
    if resultS != expectedS:
        #raise "solution(%s) => %s     Expected: %s" % (inputS, resultS, expectedS)
        sys.stderr.write("solution(%s) => %s     Expected: %s\n" % (inputS, resultS, expectedS) )
    else:
        print "solution(%s) => %s     OK!" % (inputS, resultS)
except BaseException as err:
    sys.stderr.writeln(err)
