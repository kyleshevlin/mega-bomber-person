import { CELL_SIZE } from '../constants'
import bomberFactory from './bomber'
import liverFactory from './liver'
import moverFactory from './mover'

const PLAYER_SIZE = CELL_SIZE - 10

const playerFactory = (options = {}) => {
  const { name, velocity = 3, x = 0, y = 0 } = options

  const state = {
    background: 'red',
    height: PLAYER_SIZE,
    name,
    width: PLAYER_SIZE
  }

  return Object.assign(
    state,
    liverFactory({}),
    moverFactory({ velocity, x, y }),
    bomberFactory(state)
  )
}

export default playerFactory
