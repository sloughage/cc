let containsSum = (arr, n) => {
  let max = Math.max.apply(null, arr)
  let min = Math.min.apply(null, arr)
  let len = max - min
  let hash_table = Array(len).fill(false)
  arr.forEach(x => {
    hash_table[x-1] = true
  })
  for (let i = 0; i < len; i++) {
    let k = n - (2*min) - i
    if (hash_table[i] && hash_table[k] && i != k) {
      return true
    }
  }
  return false
}

let a1 = [1,2,3]
let a2 = [3, 5, 6]
console.log(containsSum(a1, 5))
console.log(containsSum(a1, 6))

console.log(containsSum(a2, 8))
console.log(containsSum(a2, 10))