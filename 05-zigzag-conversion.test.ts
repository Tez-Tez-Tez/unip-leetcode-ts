function convert(s: string, numRows: number): string {
    if (numRows === 1 || numRows >= s.length) return s;

    const rows: string[] = new Array(numRows).fill("");
    let curr = 0, down = false;

    for (const char of s) {
        rows[curr] += char;
        if (curr === 0 || curr === numRows - 1) down = !down;
        curr += down ? 1 : -1;
    }

    return rows.join("");
}

const tests = [
    { s: "PAYPALISHIRING", numRows: 3, expected: "PAHNAPLSIIGYIR" },
    { s: "PAYPALISHIRING", numRows: 4, expected: "PINALSIGYAHRPI" },
    { s: "A", numRows: 1, expected: "A" },
    { s: "AB", numRows: 1, expected: "AB" },
];

for (const { s, numRows, expected } of tests) {
    const result = convert(s, numRows);
    const pass = result === expected;
    console.log(`${pass ? '✅' : '❌'} convert("${s}", ${numRows}) → "${result}" ${pass ? '' : `(expected "${expected}")`}`);
}
