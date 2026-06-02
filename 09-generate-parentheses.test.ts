function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    function backtrack(curr: string, open: number, close: number) {
        if (curr.length === n * 2) {
            result.push(curr);
            return;
        }
        if (open < n) backtrack(curr + "(", open + 1, close);
        if (close < open) backtrack(curr + ")", open, close + 1);
    }

    backtrack("", 0, 0);
    return result;
}

const tests = [
    { n: 3, expected: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
    { n: 1, expected: ["()"] },
    { n: 2, expected: ["(())", "()()"] },
];

for (const { n, expected } of tests) {
    const result = generateParenthesis(n);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? '✅' : '❌'} generateParenthesis(${n}) → [${result}] ${pass ? '' : `(expected [${expected}])`}`);
}
