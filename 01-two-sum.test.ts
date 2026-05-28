function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }
        seen.set(nums[i], i);
    }
    return [];
}

const tests = [
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { nums: [3, 3], target: 6, expected: [0, 1] },
];

for (const { nums, target, expected } of tests) {
    const result = twoSum(nums, target);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? '✅' : '❌'} twoSum([${nums}], ${target}) → [${result}] ${pass ? '' : `(expected [${expected}])`}`);
}
