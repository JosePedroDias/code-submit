{{SOLUTION}}

var inputS = '{{INPUT}}';;
var expectedS = '{{OUTPUT}}';
var expected  = JSON.parse(expectedS);

try {
    var result  = solution({{INPUT}});
    var resultS = JSON.stringify(result);

    if (resultS !== expectedS) {
        throw ['solution(', inputS, ') => ', resultS, '     Expected: ', expectedS].join('');
    }
    else {
        console.log( ['solution(', inputS, ') => ', resultS, '     OK!'].join('') );
    }
} catch (ex) {
    console.error(ex);
}
