export interface Question {
  id: number;
  title: string;
  code: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    code: `function twoSum(nums: number[], target: number): number[]`,
    question: "¿Qué devuelve twoSum([2, 7, 11, 15], 9)?",
    options: ["[0, 1]", "[1, 2]", "[0, 2]", "[1, 3]"],
    correctIndex: 0,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    code: `Input: l1 = [2,4,3], l2 = [5,6,4]`,
    question: "¿Qué valores tienen los nodos de la lista resultado al sumar 243 + 564?",
    options: ["7 → 0 → 8", "7 → 8 → 0", "8 → 0 → 7", "6 → 0 → 8"],
    correctIndex: 0,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    code: `lengthOfLongestSubstring("abcabcbb")`,
    question: "¿Cuál es la longitud de la subcadena más larga sin caracteres repetidos en 'abcabcbb'?",
    options: ["3", "4", "2", "5"],
    correctIndex: 0,
  },
  {
    id: 4,
    title: "Longest Palindromic Substring",
    code: `longestPalindrome("babad")`,
    question: "¿Cuál es un posible palíndromo más largo en 'babad'?",
    options: ["'bab'", "'bad'", "'babab'", "'aba'"],
    correctIndex: 0,
  },
  {
    id: 5,
    title: "Zigzag Conversion",
    code: `convert("PAYPALISHIRING", 3)`,
    question: "¿Qué devuelve convert('PAYPALISHIRING', 3)?",
    options: ["'PAHNAPLSIIGYIR'", "'PYAIHRNAPLSIIG'", "'PAYPALISHIRING'", "'PINALSIGYAHRPI'"],
    correctIndex: 0,
  },
  {
    id: 6,
    title: "Reverse Integer",
    code: `reverse(123)`,
    question: "¿Qué devuelve reverse(123)?",
    options: ["321", "123", "-321", "0"],
    correctIndex: 0,
  },
  {
    id: 7,
    title: "String to Integer (atoi)",
    code: `myAtoi("   -42")`,
    question: "¿Qué devuelve myAtoi('   -42')?",
    options: ["-42", "42", "0", "NaN"],
    correctIndex: 0,
  },
  {
    id: 8,
    title: "Palindrome Number",
    code: `isPalindrome(121)`,
    question: "¿Qué devuelve isPalindrome(121)?",
    options: ["true", "false"],
    correctIndex: 0,
  },
  {
    id: 9,
    title: "Generate Parentheses",
    code: `generateParenthesis(3)`,
    question: "¿Cuántas combinaciones válidas de paréntesis genera generateParenthesis(3)?",
    options: ["5", "3", "6", "4"],
    correctIndex: 0,
  },
  {
    id: 10,
    title: "Search Insert Position",
    code: `searchInsert([1,3,5,6], 5)`,
    question: "¿Qué índice devuelve searchInsert([1,3,5,6], 5)?",
    options: ["2", "1", "3", "0"],
    correctIndex: 0,
  },
];
