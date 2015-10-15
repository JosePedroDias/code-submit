function solution(A) {
    var i,
        len = A.length,
        sum = 0,
        leftSum = 0,
        rightSum;

    for (i = 0; i < len; i++) {
        sum += A[i];
    }

    for (i = 0; i < len; i++) {
        rightSum = sum - leftSum - A[i];

        if (leftSum === rightSum) {
            return i;
        }

        leftSum += A[i];
    }

    return -1;
}