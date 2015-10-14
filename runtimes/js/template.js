var assert = require('assert');

{{SOLUTION}}

var inputS    = "{{INPUT}}";
var expectedS = "{{OUTPUT}}";
var expected  =  {{OUTPUT}};

try {
    var result  = solution({{INPUT}});
    var resultS = JSON.stringify(result).replace(/"/g, "'");

    assert.deepEqual(result, expected);
    
    console.log( ['solution(', inputS, ') => ', resultS, '     OK!'].join('') );
} catch (ex) {
    console.error(ex);
}
