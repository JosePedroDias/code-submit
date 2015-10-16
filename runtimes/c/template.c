#include <stdio.h>

{{SOLUTION}}

char* inputS = "{{INPUT}}";
int expected = {{OUTPUT}};
char* expectedS = "{{OUTPUT}}";

int main() {
    int result = solution({{INPUT}});

    if (result != expected) {
        fprintf(stderr, "solution(%s) => %d     Expected: %s\n", inputS, result, expectedS);
    }
    else {
        printf("solution(%s) => %d     OK!\n", inputS, result);
    }
    
    return 0;
}
