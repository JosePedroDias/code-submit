var _assert_ = require('assert');

module._load = function(request/*, parent, isMain*/) {
    console.error('attempted to require module "' + request + '"!');
};

{{SOLUTION}}

var inputS    = "{{INPUT}}";
var expectedS = "{{OUTPUT}}";
var expected  =  {{OUTPUT}};

try {
    var result  = solution({{INPUT}});

    _assert_.notStrictEqual(result, undefined, 'solution has not returned any value!');

    var resultS = JSON.stringify(result).replace(/"/g, "'");

    _assert_.deepEqual(result, expected);
    
    console.log( ['solution(', inputS, ') => ', resultS, '     OK!'].join('') );
} catch (ex) {
    console.error(ex);
}
