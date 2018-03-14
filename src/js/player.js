import { CELL_SIZE } from './constants'

const playerFactory = () => ({
  width: CELL_SIZE,
  height: CELL_SIZE,
  background: 'red',
  x: 0,
  y: 0,
  speed: 10
})

export default playerFactory
