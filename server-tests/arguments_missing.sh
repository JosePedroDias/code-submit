#!/bin/bash

curl \
-X POST \
-H "Content-Type: application/json" \
-H "Cache-Control: no-cache" \
-d 'functin solution(a, b) {
    return a + b;
}' \
'http://127.0.0.1:6662?args=2,3&expectedResult=5'
