function reverse(x: number): number {
    const MIN = -2147483648;
    const MAX = 2147483647;
    let rev = 0;

    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);

        if (rev > Math.trunc(MAX / 10) || (rev === Math.trunc(MAX / 10) && digit > 7)) return 0;
        if (rev < Math.trunc(MIN / 10) || (rev === Math.trunc(MIN / 10) && digit < -8)) return 0;

        rev = rev * 10 + digit;
    }

    return rev;
}

const tests = [
    { x: 123, expected: 321 },
    { x: -123, expected: -321 },
    { x: 120, expected: 21 },
    { x: 1534236469, expected: 0 },
    { x: -2147483412, expected: -2143847412 },
];

for (const { x, expected } of tests) {
    const result = reverse(x);
    const pass = result === expected;
    console.log(`${pass ? '✅' : '❌'} reverse(${x}) → ${result} ${pass ? '' : `(expected ${expected})`}`);
}
