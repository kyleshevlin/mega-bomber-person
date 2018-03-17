const moverFactory = ({ speed = 1, x = 0, y = 0 }) => {
  const state = {
    position: {
      x,
      y
    },
    speed
  }

  const adjust = (x, y) => {
    state.position.x += x
    state.position.y += y
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

  return Object.assign(state, { adjust, moveLeft, moveRight, moveUp, moveDown })
}

export default moverFactory
