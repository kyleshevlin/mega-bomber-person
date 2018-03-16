function liverFactory() {
  return {
    alive: true,
    die() {
      this.alive = false
    },
    revive() {
      this.alive = true
    }
  }
}

export default liverFactory
