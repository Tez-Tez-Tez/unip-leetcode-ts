class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function arrayToList(nums: number[]): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy;
    for (const n of nums) {
        curr.next = new ListNode(n);
        curr = curr.next;
    }
    return dummy.next;
}

function listToArray(node: ListNode | null): number[] {
    const result: number[] = [];
    while (node) {
        result.push(node.val);
        node = node.next;
    }
    return result;
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1?.next ?? null;
        l2 = l2?.next ?? null;
    }

    return dummy.next;
}

const tests = [
    { l1: [2, 4, 3], l2: [5, 6, 4], expected: [7, 0, 8] },
    { l1: [0], l2: [0], expected: [0] },
    { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
];

for (const { l1, l2, expected } of tests) {
    const result = listToArray(addTwoNumbers(arrayToList(l1), arrayToList(l2)));
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? '✅' : '❌'} [${l1}] + [${l2}] → [${result}] ${pass ? '' : `(expected [${expected}])`}`);
}
