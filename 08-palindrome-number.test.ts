function isPalindrome(x: number): boolean {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let rev = 0;
    while (x > rev) {
        rev = rev * 10 + (x % 10);
        x = Math.trunc(x / 10);
    }

    return x === rev || x === Math.trunc(rev / 10);
}

const tests = [
    { x: 121, expected: true },
    { x: -121, expected: false },
    { x: 10, expected: false },
    { x: 0, expected: true },
    { x: 1221, expected: true },
];

for (const { x, expected } of tests) {
    const result = isPalindrome(x);
    const pass = result === expected;
    console.log(`${pass ? '✅' : '❌'} isPalindrome(${x}) → ${result} ${pass ? '' : `(expected ${expected})`}`);
}
