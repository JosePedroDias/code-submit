#include <stdio.h>


{{SOLUTION}}

char* inputS = "{{INPUT}}";
char* expectedS = "{{OUTPUT}}";

int main() {
    auto result  = solution({{INPUT}});

    printf("RESULT: %d", result);
    
    return 0;
}


/*if (resultS !== expectedS) {
    throw ['solution(', inputS, ') => ', resultS, '     Expected: ', expectedS].join('');
}
else {
    console.log( ['solution(', inputS, ') => ', resultS, '     OK!'].join('') );
}*/
