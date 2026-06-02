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
