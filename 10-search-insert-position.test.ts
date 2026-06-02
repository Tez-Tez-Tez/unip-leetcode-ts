function searchInsert(nums: number[], target: number): number {
    let left = 0, right = nums.length;

    while (left < right) {
        const mid = (left + right) >>> 1;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}

const tests = [
    { nums: [1, 3, 5, 6], target: 5, expected: 2 },
    { nums: [1, 3, 5, 6], target: 2, expected: 1 },
    { nums: [1, 3, 5, 6], target: 7, expected: 4 },
    { nums: [1, 3, 5, 6], target: 0, expected: 0 },
    { nums: [1], target: 0, expected: 0 },
];

for (const { nums, target, expected } of tests) {
    const result = searchInsert(nums, target);
    const pass = result === expected;
    console.log(`${pass ? '✅' : '❌'} searchInsert([${nums}], ${target}) → ${result} ${pass ? '' : `(expected ${expected})`}`);
}
