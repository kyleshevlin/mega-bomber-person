import bombFactory from './bomb'

export default function bomberFactory(entity) {
  return {
    bombs: {
      count: 1,
      max: 1
    },

    incrementBombMax() {
      this.bombs.max++
      this.bombs.count++
    },

    dropBomb() {
      if (this.bombs.count > 0) {
        const bomb = bombFactory(entity)
        bomb.plant()
        this.bombs.count--

        console.log(
          'A bomb as dropped at coordinates: ' +
            `${entity.position.x}, ${entity.position.y}`
        )
      }
    },

    replenishBomb() {
      if (this.bombs.count < this.bombs.max) {
        this.bombs.count++
      }
    }
  }
}
