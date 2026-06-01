function longestPalindrome(s: string): string {
    if (s.length < 2) return s;
    let start = 0, maxLen = 1;

    function expandAroundCenter(left: number, right: number) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);
        expandAroundCenter(i, i + 1);
    }

    return s.substring(start, start + maxLen);
}

const tests = [
    { s: "babad", expected: ["bab", "aba"] },
    { s: "cbbd", expected: ["bb"] },
    { s: "a", expected: ["a"] },
    { s: "ac", expected: ["a", "c"] },
];

for (const { s, expected } of tests) {
    const result = longestPalindrome(s);
    const pass = expected.includes(result);
    console.log(`${pass ? '✅' : '❌'} longestPalindrome("${s}") → "${result}" ${pass ? '' : `(expected one of [${expected}])`}`);
}
