console.log('connected')
let tree = {cat: []}

function addWord (tree, string, category) {
  function addNode (node, str) {
    if (str.length === 0 && node.cat.indexOf(category) === -1) {
      node.cat.push(category)
    } else {
      let s = str.slice(0, 1)
      if (node[s] === undefined) node[s] = {cat: []}
      addNode(node[s], str.slice(1))
    }
  }
  addNode(tree, string)
}

function print (tree, string) {
  let rList = []
  function getLeaves (node, c) {
    if (rList[c] === undefined) rList.push('')
    for (let k in node) {
      if (k !== 'cat') {
        rList[c] += k
        getLeaves(node[k], c + 1)
      }
    }
    rList[c] += ' '
  }
  getLeaves(tree, 0)
  rList = rList.slice(0, -1)
  rList = rList.map(x => x.slice(0, -1))
  for (let s of rList) console.log(s)
}

function get (tree, string) {

  let r = []

  function getBranches (node, strin, strout, c) {
    if (strin.length === 0 && c == 0) {
      getLeaves(node, strout)
    } else {
      let s0 = strin.slice(0, 1)
      let s1 = strin.slice(1, 2)
      let s1p = strin.slice(1)
      let s2p = strin.slice(2)
      if (node[s0] !== undefined) {
        getBranches(node[s0], s1p, strout + s0, c)
      }
      if (c > 0) {
        if (node[s1] !== undefined) {
          getBranches(node[s1], s0 + s2p, strout + s1, c - 1)
        }
        getBranches(node, s1p, strout, c - 1)
        for (let k in node) {
          if (k !== 'cat') {
            getBranches(node[k], strin, strout + k, c - 1)
            getBranches(node[k], s1p, strout + k, c - 1)
          }
        }
      }
    }
  }

  function getLeaves (node, strout) {
    if (node.cat.length > 0) {
      for (let c of node.cat) r.push({word: strout, cat: c})
    }
    for (let k in node) if (k !== 'cat') getLeaves(node[k], strout + k)
  }

  let errC = 0
  while (errC < string.length && r.length === 0) {
    getBranches(tree, string, '', errC)
    errC++
  }

  return r.sort((a, b) => {
    return a.word > b.word
  })
}

const dict = [
  'a','act','an','ant','arc','arcana','ark','art','at','attack','attract',
  'attractant','can','car','cart','cat','cataract','crack','crank','karat',
  'katana','knack','knar','rack','ran','rank','rant','rat','tack','tact','tan',
  'tank','tar','tarn','tart','tartan','tartar','track','tract'
]

for (let d of dict) addWord(tree, d, 'word')
print(tree)
console.log(get(tree, 'ar'))