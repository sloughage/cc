import Lvl from './lvl/Lvl.js'

const KEYS = {
  65: false, // left (a)
  68: false, // right (d)
  87: false, // up (w)
  83: false, // down (s)
  32: false, // fire (space)
  80: false  // pause (p)
}

const CTX = document.getElementById('canvas').getContext('2d')

const LVL = new Lvl()

function KEYDOWN (e) {
  if (e.keyCode === 65) {
    KEYS[65] = true
    KEYS[68] = false
  } else if (e.keyCode === 68) {
    KEYS[68] = true
    KEYS[65] = false
  } else if (e.keyCode === 87) {
    KEYS[87] = true
    KEYS[83] = false
  } else if (e.keyCode === 83) {
    KEYS[83] = true
    KEYS[87] = false
  }
}

function KEYUP (e) {
  if (e.keyCode in KEYS) KEYS[e.keyCode] = false
}

export {KEYS, CTX, LVL, KEYDOWN, KEYUP}
