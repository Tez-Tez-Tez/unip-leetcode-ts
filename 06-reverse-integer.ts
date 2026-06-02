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
