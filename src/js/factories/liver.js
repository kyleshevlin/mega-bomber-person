export default function liverFactory(options = {}) {
  const { health = 3 } = options

  return {
    alive: true,
    health,

    incrementHealth() {
      this.health++

      if (!this.alive && this.health > 0) {
        this.revive()
      }
    },

    decrementHealth() {
      this.health--

      if (this.health === 0) {
        this.die()
      }
    },

    die() {
      this.alive = false
    },

    revive() {
      this.alive = true
    }
  }
}
