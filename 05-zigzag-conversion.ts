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
