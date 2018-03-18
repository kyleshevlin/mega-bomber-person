const bomberFactory = entity => {
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
      console.log(`A bomb as dropped at coordinates: ${entity.x}, ${entity.y}`)
      state.bombs.count--
      // This will be made better
      setTimeout(() => {
        replenishBomb()
      }, 3000)
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
