import {LVL, KEYDOWN, KEYUP} from './g.js'

document.addEventListener('keydown', KEYDOWN, false)
document.addEventListener('keyup', KEYUP, false)

function main () {
  LVL.load()
  LVL.update()
  LVL.draw()
  window.requestAnimationFrame(main)
}

LVL.loadLvl('test1')
window.requestAnimationFrame(main)
