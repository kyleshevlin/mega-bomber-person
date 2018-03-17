const bombFactory = entity => {
  const state = {
    background: 'black',
    blastRadius: 1,
    fuse: 3000,
    height: 20,
    width: 20
  }

  const detonate = () => {
    console.log('Boom 💥')
  }

  const plant = () => {
    entity.dropBomb()

    setTimeout(() => {
      detonate()
      entity.addBomb()
    }, state.fuse)
  }

  return Object.assign(state, {
    detonate,
    plant
  })
}

export default bombFactory
