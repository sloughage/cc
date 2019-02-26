import Unit from './Obj.js'
import {KEYS} from '../g.js'

export default class extends Unit {

  constructor (x, y) {
    super(x, y, 10, '#fff')
  }

  update () {
    const dx = KEYS[68] - KEYS[65]
    const dy = KEYS[83] - KEYS[87]
    if (dx || dy) {
      const k = 3 / Math.sqrt(Math.abs(dx) + Math.abs(dy))
      this.x = Math.max(Math.min(this.x + dx * k, 720), 0)
      this.y = Math.max(Math.min(this.y + dy * k, 360), 0)
    }
  }

}
