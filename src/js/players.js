import { CELL_SIZE } from './constants'

const PLAYER_SIZE = CELL_SIZE - 10

const playerFactory = () => ({
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  background: 'red',
  x: 0,
  y: 0,
  speed: 3
})

export default playerFactory
