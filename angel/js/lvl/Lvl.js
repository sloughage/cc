import {CTX} from '../g.js'
import test1 from './test1.js'

const lvls = {
  test1: test1
}

export default class {

  constructor () {
    this.stored_units
    this.active_units
    this.scroll
  }

  loadLvl (name) {
    this.stored_units = lvls[name].units
    this.active_units = []
    this.scroll = 0
  }

  load () {
    const getNext = () => {
      if (this.stored_units[0] && this.stored_units[0].x < this.scroll + 750) {
        return this.stored_units.shift()
      }
      return null
    }
    let next = getNext()
    while (next) {
      this.active_units.push(next)
      next = getNext()
    }
  }

  update () {
    for (let u of this.active_units) u.update()
  }

  draw () {
    CTX.clearRect(0, 0, 720, 360)
    for (let u of this.active_units) u.draw()
  }

}
