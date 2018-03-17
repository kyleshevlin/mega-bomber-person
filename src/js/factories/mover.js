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

  return Object.assign(state, { moveLeft, moveRight, moveUp, moveDown })
}

export default moverFactory
