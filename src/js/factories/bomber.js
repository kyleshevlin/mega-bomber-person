import bombFactory from './bomb'

const bomberFactory = bomber => {
  const state = {
    bombs: {
      count: 1,
      max: 1
    }
  }

  const incrementBombMax = () => {
    state.bombs.max++
  }

  const dropBomb = () => {
    if (state.bombs.count > 0) {
      const bomb = bombFactory(bomber)
      bomb.plant()
      state.bombs.count--

      console.log(
        'A bomb as dropped at coordinates: ' +
          `${bomber.position.x}, ${bomber.position.y}`
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
