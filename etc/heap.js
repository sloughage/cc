class heap {
  constructor () {
    this.arr = []}

  get () {return this.arr.length ? this.arr[0] : null}

  swap (x, y) {
    let temp = this.arr[x]
    this.arr[x] = this.arr[y]
    this.arr[y] = temp
  }

  insert (x) {
    this.arr.push(x)
    let i = this.arr.length - 1
    while (i) {
      let p = Math.ceil(i / 2) - 1
      if (this.arr[i] < this.arr[p]) this.swap(i, p)
      i = p
    }
  }

  extract () {
    let s = this.arr.length
    this.swap(0, s - 1)
    let r = this.arr.pop()
    let i = 0
    do {
      let l = 2 * i + 1
      let r = l + 1
      let c = l < s ? this.arr[l] > this.arr[r] ? r : l : 0
      if (c && this.arr[c] < this.arr[i]) this.swap(i, c)
      i = c
    } while (i)
    return typeof r === 'undefined' ? null : r
  }

  inorder () {
    let rarr = []
    let arr = this.arr
    let length = arr.length
    function rec (i) {
      if (i < length) {
        rec(2*i+1)
        rarr.push(arr[i])
        rec(2*i+2)
      }
    }
    rec(0)
    return rarr
  }

  preorder () {
    let rarr = []
    let arr = this.arr
    let length = arr.length
    function rec (i) {
      if (i < length) {
        rarr.push(arr[i])
        rec(2*i+1)
        rec(2*i+2)
      }
    }
    rec(0)
    return rarr
  }

  postorder () {
    let rarr = []
    let arr = this.arr
    let length = arr.length
    function rec (i) {
      if (i < length) {
        rec(2*i+1)
        rec(2*i+2)
        rarr.push(arr[i])
      }
    }
    rec(0)
    return rarr
  }
}

let h = new heap()
h.arr = ['F','B','G','A','D','I','','','C','E','H']
console.log(h.arr)
console.log(h.inorder())
console.log(h.preorder())
console.log(h.postorder())
