import { isNothing } from '../utils'

const moverFactory = ({ speed = 1, x = 0, y = 0 }) => {
  const state = {
    position: {
      x,
      y
    },
    speed
  }

  const moveLeft = () => {
    state.position.x -= state.speed
  }

  const moveRight = () => {
    state.position.x += state.speed
  }

  const moveUp = () => {
    state.position.y -= state.speed
  }

  const moveDown = () => {
    state.position.y += state.speed
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
