import { playerFactory } from '../factories/player'

export const ACCEL = 0.6
export const CELL_SIZE = 50
export const FPS = 60
export const FRICTION = 0.6
export const PLAYER_SIZE = CELL_SIZE
export const STEP = 1 / FPS

export const LEVEL_CHARS = {
  '@': playerFactory,
  '#': 'wall'
}

export const LEVEL_1 = `
@........
.w.w.w.w.
..w...w..
.........
....w....
.........
..w...w..
.w.w.w.w.
.........
`
