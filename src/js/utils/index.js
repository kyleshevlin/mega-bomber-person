import { CELL_SIZE } from '../constants'

export const isNothing = x => x === null || x === undefined

const xCollision = a => b => a.x < b.x + b.width && a.x + a.width > b.x

const yCollision = a => b => a.y < b.y + b.height && a.y + a.height > b.y

export const collision = a => b => xCollision(a)(b) && yCollision(a)(b)

export const timestamp = () =>
  window.performance && window.performance.now
    ? window.performance.now()
    : new Date().getTime()

export const bound = (value, min, max) => Math.max(min, Math.min(value, max))

export const tileToPixel = tile => tile * CELL_SIZE

export const pixelToTile = pixel => Math.floor(pixel / CELL_SIZE)
