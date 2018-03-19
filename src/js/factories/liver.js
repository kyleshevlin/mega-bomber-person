const liverFactory = (options = {}) => {
  const { health = 3 } = options

  const state = {
    alive: true,
    health
  }

  const incrementHealth = () => {
    state.health++

    if (!state.alive && state.health > 0) {
      revive()
    }
  }

  const decrementHealth = () => {
    state.health--

    if (state.health === 0) {
      die()
    }
  }

  const die = () => {
    state.alive = false
  }

  const revive = () => {
    state.alive = true
  }

  return Object.assign(state, { decrementHealth, die, incrementHealth, revive })
}

export default liverFactory
