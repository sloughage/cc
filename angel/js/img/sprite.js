const CTX = document.getElementById('canvas').getContext('2d')

class Sprite {
  constructor (width, height, image) {
    this.width = width
    this.height = height
    this.image = image
    this.frame = 0
  }

  update () {
    this.frame = (this.frame + 1) % 10
  }

  draw () {
    CTX.drawImage(
      this.image,
      this.frame,
    )
  }
}

let coinsheet = new Image()
coinsheet.src = 'images/coin_ss.png'
console.log(coinsheet.width)
