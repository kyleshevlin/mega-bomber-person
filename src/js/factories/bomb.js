const bombFactory = bomber => {
  const state = {
    autoDetonate: true,
    background: 'black',
    blastRadius: 1,
    fuse: 3000,
    height: 20,
    width: 20
  }

  const detonate = () => {
    console.log('Boom 💥')
    // logic here to handle blast radius
    bomber.replenishBomb()
  }

  const plant = () => {
    if (state.autoDetonate) {
      // logic here to add bomb to game and position it
      setTimeout(() => {
        detonate()
      }, state.fuse)
    }
  }

  const decrementBlastRadius = () => {
    state.blastRadius--
  }

  const incrementBlastRadius = () => {
    state.blastRadius++
  }

  const toggleAutoDetonation = () => {
    state.autoDetonate = !state.autoDetonate
  }

  const updateFuse = time => {
    state.fuse = time
  }

  return Object.assign(state, {
    decrementBlastRadius,
    detonate,
    incrementBlastRadius,
    plant,
    toggleAutoDetonation,
    updateFuse
  })
}

export default bombFactory
