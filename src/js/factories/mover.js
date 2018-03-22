import { isNothing } from '../utils'

export default function moverFactory(options = {}) {
  const { speed = 1, x = 0, y = 0 } = options

  return {
    position: {
      x,
      y
    },
    speed,

    moveLeft() {
      this.position.x -= this.speed
    },

    moveRight() {
      this.position.x += this.speed
    },

    moveUp() {
      this.position.y -= this.speed
    },

    moveDown() {
      this.position.y += this.speed
    },

    reposition(x, y) {
      if (!isNothing(x)) {
        this.position.x = x
      }

      if (!isNothing(y)) {
        this.position.y = y
      }
    }
  }
}
