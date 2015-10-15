import sys
import pickle

{{SOLUTION}}

inputS = """{{INPUT}}"""
expectedS = """{{OUTPUT}}"""
expected  = {{OUTPUT}}

try:
    result  = solution({{INPUT}})
    resultS = repr(result)
    
    #if resultS != expectedS:
    if pickle.dumps(result) != pickle.dumps(expected):
        sys.stderr.write("solution(%s) => %s     Expected: %s\n" % (inputS, resultS, expectedS) )
    else:
        print "solution(%s) => %s     OK!" % (inputS, resultS)
except BaseException as err:
    sys.stderr.write(err)
    sys.stderr.write("\n")
