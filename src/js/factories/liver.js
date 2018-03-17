const liverFactory = () => {
  const state = {
    alive: true
  }

  const die = () => {
    state.alive = false
  }

  const revive = () => {
    state.alive = true
  }

  return Object.assign(state, { die, revive })
}

export default liverFactory
