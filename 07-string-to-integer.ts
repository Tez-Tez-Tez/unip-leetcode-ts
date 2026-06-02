function myAtoi(s: string): number {
    const MIN = -2147483648;
    const MAX = 2147483647;
    let i = 0, sign = 1, result = 0;

    while (i < s.length && s[i] === ' ') i++;

    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        const digit = s.charCodeAt(i) - 48;
        if (result > Math.trunc(MAX / 10) || (result === Math.trunc(MAX / 10) && digit > 7)) {
            return sign === 1 ? MAX : MIN;
        }
        result = result * 10 + digit;
        i++;
    }

    return result * sign;
}
