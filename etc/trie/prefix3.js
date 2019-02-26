// node: str value, [] children, bool eow
// trie: node root, fun add, fun del, fun get, fun contains
// optimizations: children alphabetical

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

function getSimple (tree, str) {
  let rList = []
  function getBranches (n, s) {
    if (s.length === 0) getLeaves(n, str)
    else if (n[s.slice(0, 1)] !== undefined) {
      getBranch(n[s.slice(0, 1)], s.slice(1))
    }
  }
  function getLeaves (n, s) {
    if (n.$) rList.push(s)
    for (let k in n) if (k !== '$') getLeaves(n[k], s + k)
  }
  getBranches(tree, str)
  return rList.sort((a, b) => a.length > b.length)
}

function del (tree, str) {
  let node = this.root
  let s = str
  let history = []
  while (s.length > 0) {
    let i = node.children.map(x => x.value).indexOf(s.substring(0, 1))
    if (i === -1) {
      return false
    } else {
      history.push(node)
      node = node.children[i]
      s = s.substring(1)
    }
  }
  node.eow = false
  while (history.length > 1) {
    if (node.children.length === 0) {
      let child = node.value
      node = history.pop()
      node.children.splice(node.children.map(x => x.value).indexOf(child), 1)
    } else {
      break
    }
  }
  return true
}

function clear () {
  tree = {cat: []}
}

  // del (str) {
  //   var history = []
  //   function goUp(n, i, h) {
  //     if (Object.keys(n).length === 1 && n.$ === false) {
  //       n = h.pop();
  //       delete n[str[i]];
  //       goUp(n, i - 1, h)
  //     }
  //   }
  //   function goDown(n, i, h){
  //     if (i < str.length) {
  //       if (n[str[i]] !== undefined) {
  //         history.push(n);
  //         goDown(n[str[i]], i + 1);
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       n.$ = false;
  //       goUp(history.pop(), i - 1, h)
  //     }
  //   }
  //   getHis(this.root, str);
  // }

  // this.getD = function(str, del){
  //  var rList = [];
  //  function getPaths(n, rStr){
  //    if(n.$){rList.push(rStr)};
  //    for(k in n){if(k != "$"){getPaths(n[k], rStr + k)}};
  //  }
  //  function findPaths(n, s, c, w){
  //    if(s.length == 0 && c == 0){getPaths(n, w + "$")};
  //    if(c > 0 && s.length > 0){findPaths(n, s.slice(1), c - 1, w)};
  //    if(n[s.slice(0, 1)] !== undefined){findPaths(n[s.slice(0, 1)], s.slice(1), c, w + s.slice(0, 1))};
  //  }
  //  findPaths(this.root, str, del, "");
  //  return rList;
  // }

  // this.getI = function(str, ins){
  //  var rList = [];
  //  function getPaths(n, rStr){
  //    if(n.$){rList.push(rStr)};
  //    for(k in n){if(k != "$"){getPaths(n[k], rStr + k)}};
  //  }
  //  function findPaths(n, s, c, w){
  //    if(s.length == 0 && c == 0){getPaths(n, w + "$")};
  //    if(c > 0 && s.length > 0){for(k in n){findPaths(n[k], s, c - 1, w + k)}};
  //    if(n[s.slice(0, 1)] !== undefined){findPaths(n[s.slice(0, 1)], s.slice(1), c, w + s.slice(0, 1))};
  //  }
  //  findPaths(this.root, str, ins, "");
  //  return rList;
  // }

  // this.getS = function(str, sub){
  //  var rList = [];
  //  function getPaths(n, rStr){
  //    if(n.$){rList.push(rStr)};
  //    for(k in n){if(k != "$"){getPaths(n[k], rStr + k)}};
  //  }
  //  function findPaths(n, s, c, w){
  //    if(s.length == 0 && c == 0){getPaths(n, w + "$")};
  //    if(c > 0 && s.length > 0){for(k in n){if(k != s.slice(0, 1)){findPaths(n[k], s.slice(1), c - 1, w + k)}}};
  //    if(n[s.slice(0, 1)] !== undefined){findPaths(n[s.slice(0, 1)], s.slice(1), c, w + s.slice(0, 1))};
  //  }
  //  findPaths(this.root, str, sub, "");
  //  return rList;
  // }

  // this.getN = function(str, swp){
  //  var rList = [];
  //  function getPaths(n, rStr){
  //    if(n.$){rList.push(rStr)};
  //    for(k in n){if(k != "$"){getPaths(n[k], rStr + k)}};
  //  }
  //  function findPaths(n, s, c, w){
  //    if(s.length == 0){getPaths(n, w)};
  //    if(c > 0 && s.length > 1){if(n[s.slice(1, 2)] !== undefined){
  //      findPaths(n[s.slice(1,2)], s.slice(0, 1) + s.slice(2), c - 1, w + s.slice(1, 2))
  //    }}
  //    if(n[s.slice(0, 1)] !== undefined){findPaths(n[s.slice(0, 1)], s.slice(1), c, w + s.slice(0, 1))};
  //  }
  //  findPaths(this.root, str, swp, "");
  //  return rList;
  // }

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

// function preprocess (str) {
//   var r = [str]
//   var s = str.split(' ')
//   for (let i = 1; i < s.length; i++) {
//     r.push(s.slice(i).join(' ') + '/' + s.slice(0, i).join(' '))
//   }
//   return r
// }

// function postprocess (str) {
//   return str.split('/').reverse().join(' ')
// }

const dict = [
  'a','act','an','ant','arc','arcana','ark','art','at','attack','attract',
  'attractant','can','car','cart','cat','cataract','crack','crank','karat',
  'katana','knack','knar','rack','ran','rank','rant','rat','tack','tact','tan',
  'tank','tar','tarn','tart','tartan','tartar','track','tract'
]

for (let d of dict) addWord(tree, d, 'word')
print(tree)
console.log(get(tree, 'ar'))