class Tree {
  constructor () {
    this.root = {}
  }
  add (n) {
    this.root.n = {}
  }
}

const t = new Tree()
t.add('k')
console.log(t)

let tree = {}
tree.add = function (x) {
  tree.a = x
}
tree.add(2)
console.log(tree)
