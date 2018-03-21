import bombFactory from './bomb'

const bomberFactory = entity => {
  const state = {
    bombs: {
      count: 1,
      max: 1
    }
  }

  const incrementBombMax = () => {
    state.bombs.max++
    state.bombs.count++
  }

  const dropBomb = () => {
    if (state.bombs.count > 0) {
      const bomb = bombFactory(entity)
      bomb.plant()
      state.bombs.count--

      console.log(
        'A bomb as dropped at coordinates: ' +
          `${entity.position.x}, ${entity.position.y}`
      )
    }
  }

  const replenishBomb = () => {
    if (state.bombs.count < state.bombs.max) {
      state.bombs.count++
    }
  }

  return Object.assign(state, {
    dropBomb,
    incrementBombMax,
    replenishBomb
  })
}

export default bomberFactory
