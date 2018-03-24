import { PLAYER_SIZE } from '../constants'
import bomberFactory from './bomber'
import liverFactory from './liver'
import moverFactory from './mover'
import toucherFactory from './toucher'

const defaultOptions = {
  background: 'blue',
  name: '',
  speed: 3,
  x: 0,
  y: 0
}

export default function playerFactory(options = {}) {
  const { background, name, speed, x, y } = Object.assign(
    {},
    defaultOptions,
    options
  )

  const player = {
    background,
    height: PLAYER_SIZE,
    name,
    speed,
    width: PLAYER_SIZE,
    x,
    y
  }

  return Object.assign(
    player,
    liverFactory(),
    toucherFactory(player),
    moverFactory(player),
    bomberFactory(player)
  )
}
