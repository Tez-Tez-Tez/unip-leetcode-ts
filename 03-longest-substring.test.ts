function lengthOfLongestSubstring(s: string): number {
    const seen = new Map<string, number>();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (seen.has(char) && seen.get(char)! >= left) {
            left = seen.get(char)! + 1;
        }
        seen.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

const tests = [
    { s: "abcabcbb", expected: 3 },
    { s: "bbbbb", expected: 1 },
    { s: "pwwkew", expected: 3 },
    { s: "", expected: 0 },
    { s: " ", expected: 1 },
];

for (const { s, expected } of tests) {
    const result = lengthOfLongestSubstring(s);
    const pass = result === expected;
    console.log(`${pass ? '✅' : '❌'} lengthOfLongestSubstring("${s}") → ${result} ${pass ? '' : `(expected ${expected})`}`);
}
