#!/bin/bash

curl \
-X POST \
-H "Content-Type: application/json" \
-H "Cache-Control: no-cache" \
-d 'function solution(a, b) {
    return a + b;
}' \
'http://127.0.0.1:6662?runtime=js&args=2,3&expectedResult=5'
