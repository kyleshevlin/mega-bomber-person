function moverFactory({ speed = 1, x = 0, y = 0 }) {
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
    }
  }
}

export default moverFactory
