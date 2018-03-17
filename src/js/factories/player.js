import { CELL_SIZE } from '../constants'
import bomberFactory from './bomber'
import liverFactory from './liver'
import moverFactory from './mover'

const PLAYER_SIZE = CELL_SIZE - 10

const playerFactory = ({ name, x = 0, y = 0 }) => {
  const state = {
    background: 'red',
    height: PLAYER_SIZE,
    name,
    width: PLAYER_SIZE
  }

  return Object.assign(
    state,
    liverFactory(),
    moverFactory({ x, y, speed: 3 }),
    bomberFactory(state)
  )
}

export default playerFactory
