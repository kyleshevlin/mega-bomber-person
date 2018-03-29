import playerFactory from '../factories/player'
import combustibleFactory from '../factories/combustible'

export const ACCEL = 0.6
export const SCALE = 50
export const FPS = 60
export const FRICTION = 0.6
export const PLAYER_SIZE = SCALE
export const STEP = 1 / FPS

export const LEVEL_CHARACTERS = {
  '@': playerFactory,
  '.': 'empty',
  '#': 'wall',
  c: combustibleFactory
}

export const LEVEL_1 = `
@........
.#.#.#.#.
.c.c.c.c.
.........
....#....
.........
.c.c.c.c.
.#.#.#.#.
.........
`
