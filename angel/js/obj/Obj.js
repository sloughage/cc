import {CTX} from '../g.js'

export default class {

  constructor (x, y, r, color) {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
  }

  draw () {
    CTX.beginPath()
    CTX.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    CTX.fillStyle = this.color
    CTX.fill()
    CTX.closePath()
  }

}
