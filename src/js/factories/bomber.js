function bomberFactory() {
  return {
    bombs: {
      count: 1,
      max: 1
    },
    incrementBombMax() {
      this.bombs.max++
    },
    dropBomb() {
      console.log('A bomb was dropped!')
      this.bombs.count--
    },
    replenishBomb() {
      const { count, max } = this.bombs

      if (count < max) {
        this.bombs.count++
      }
    }
  }
}

export default bomberFactory
