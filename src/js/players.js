import { CELL_SIZE } from './constants'

const PLAYER_SIZE = CELL_SIZE - 10

const mover = state => ({
  moveLeft: () => {
    state.x -= state.speed
  },
  moveRight: () => {
    state.x += state.speed
  },
  moveUp: () => {
    state.y -= state.speed
  },
  moveDown: () => {
    state.y += state.speed
  }
})

const playerFactory = ({ name, speed = 3, x = 0, y = 0 }) => {
  const state = {
    background: 'red',
    height: PLAYER_SIZE,
    name,
    speed,
    width: PLAYER_SIZE,
    x,
    y
  }

  return Object.assign(state, mover(state))
}

export default playerFactory
