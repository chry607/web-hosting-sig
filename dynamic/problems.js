// Answer-only problems: the judge compares your submitted output with the expected one.
// (Deliberately does NOT execute user code, so it is safe to host publicly.)
function lcg(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) % 2147483648); }

const nums = (() => { const r = lcg(42); return Array.from({ length: 1000 }, () => r() % 10000 - 5000); })();
const words = (() => { const r = lcg(7), ws = ['level','node','hello','racecar','web','deploy','noon','render','vercel','pages'];
  return Array.from({ length: 200 }, () => ws[r() % ws.length]); })();

const problems = [
  {
    id: 'A', title: 'Sum It Up', rating: 800,
    statement: 'Given N integers, print their sum.',
    sample: { input: '5\n1 2 3 4 5', output: '15' },
    input: `${nums.length}\n${nums.join(' ')}`,
    answer: String(nums.reduce((a, b) => a + b, 0)),
  },
  {
    id: 'B', title: 'Maximum Subarray', rating: 1200,
    statement: 'Given N integers, print the maximum sum of a non-empty contiguous subarray.',
    sample: { input: '5\n-2 1 -3 4 5', output: '9' },
    input: `${nums.length}\n${nums.join(' ')}`,
    answer: String((() => { let best = -Infinity, cur = 0; for (const x of nums) { cur = Math.max(x, cur + x); best = Math.max(best, cur); } return best; })()),
  },
  {
    id: 'C', title: 'Count Palindromes', rating: 1000,
    statement: 'Given N words (one per line), print how many are palindromes.',
    sample: { input: '3\nnoon\nweb\nlevel', output: '2' },
    input: `${words.length}\n${words.join('\n')}`,
    answer: String(words.filter(w => w === [...w].reverse().join('')).length),
  },
  {
    id: 'D', title: 'Count Primes', rating: 1400,
    statement: 'Print the number of primes less than or equal to 1000000.',
    sample: { input: '10', output: '4' },
    input: '1000000',
    answer: '78498',
  },
];
module.exports = problems;
