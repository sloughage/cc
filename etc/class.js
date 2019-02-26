class Obj {
  let k = 2
  constructor () {
    this._i = 3
  }
  i () {
    return k
  }
  get i () {
    return k
  }
}

let o = new Obj()

console.log(o)
console.log(o.i())
// console.log(o.i)
