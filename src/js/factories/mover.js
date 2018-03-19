import { isNothing } from '../utils'

const moverFactory = (options = {}) => {
  const { velocity = 1, x = 0, y = 0 } = options

  const state = {
    position: {
      x,
      y
    },
    velocity
  }

  const moveLeft = () => {
    state.position.x -= state.velocity
  }

  const moveRight = () => {
    state.position.x += state.velocity
  }

  const moveUp = () => {
    state.position.y -= state.velocity
  }

  const moveDown = () => {
    state.position.y += state.velocity
  }

  const reposition = (x, y) => {
    if (!isNothing(x)) {
      state.position.x = x
    }

    if (!isNothing(y)) {
      state.position.y = y
    }
  }

  return Object.assign(state, {
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    reposition
  })
}

export default moverFactory
