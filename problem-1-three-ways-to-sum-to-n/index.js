// Problem 1: Three ways to sum to n

// 1) Loop
var sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// 2) Formula
var sum_to_n_b = (n) => (n * (n + 1)) / 2;

// 3) Recursion
var sum_to_n_c = (n) => {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

// Test
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15
