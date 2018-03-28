import { ACCEL, SCALE, FRICTION } from '../constants'
import { bound, pixelToTile, tileToPixel } from '../utils'

export default function moverFactory(entity) {
  const { speed = 3, x = 0, y = 0 } = entity

  return {
    accel: ACCEL,
    vx: 0,
    vy: 0,
    input: {
      left: false,
      right: false,
      up: false,
      down: false
    },
    friction: FRICTION,
    x,
    y,
    speed,

    moveUpdate(grid) {
      const wasMovingLeft = this.vx < 0
      const wasMovingRight = this.vx > 0
      const wasMovingUp = this.vy < 0
      const wasMovingDown = this.vy > 0

      const clamp = value =>
        Math.abs(value) > 0.01 ? value * this.friction : 0

      if (this.input.left) {
        this.vx = -Math.min(Math.abs(this.vx) + this.accel, this.speed)
      } else if (wasMovingLeft) {
        this.vx = clamp(this.vx)
      }

      if (this.input.right) {
        this.vx = Math.min(this.vx + this.accel, this.speed)
      } else if (wasMovingRight) {
        this.vx = clamp(this.vx)
      }

      if (this.input.up) {
        this.vy = -Math.min(Math.abs(this.vy) + this.accel, this.speed)
      } else if (wasMovingUp) {
        this.vy = clamp(this.vy)
      }

      if (this.input.down) {
        this.vy = Math.min(this.vy + this.accel, this.speed)
      } else if (wasMovingDown) {
        this.vy = clamp(this.vy)
      }

      if ((wasMovingLeft && this.vx > 0) || (wasMovingRight && this.vx < 0)) {
        this.vx = 0
      }

      if ((wasMovingUp && this.vy > 0) || (wasMovingDown && this.vy < 0)) {
        this.vy = 0
      }

      // Step - Move Player based on velocity
      this.x = this.x + this.vx
      this.y = this.y + this.vy

      // Collision Detection

      // Edges
      if (this.x < 0) {
        this.x = 0
        this.vx = 0
      } else if (this.x + this.width > grid.width * SCALE) {
        this.x = grid.width * SCALE - this.width
        this.vx = 0
      }

      if (this.y < 0) {
        this.y = 0
        this.vy = 0
      } else if (this.y + this.height > grid.height * SCALE) {
        this.y = grid.height * SCALE - this.height
        this.vy = 0
      }

      // Grid Collisions
      const row = bound(pixelToTile(this.y), 0, grid.width)
      const col = bound(pixelToTile(this.x), 0, grid.height)
      const xRemainder = this.x % SCALE
      const yRemainder = this.y % SCALE

      const checkGrid = (row, col) => {
        let value

        try {
          value = grid[row][col]
        } catch (err) {
          value = 'x' // a non-empty cell, treat it like
        }

        return value
      }

      const cell = checkGrid(row, col)
      const cellRight = checkGrid(row, col + 1)
      const cellDown = checkGrid(row + 1, col)
      const cellDiagonal = checkGrid(row + 1, col + 1)

      const nonEmptyCell = tile => tile !== ' '

      if (this.vx > 0) {
        if (
          nonEmptyCell(cellRight) ||
          (nonEmptyCell(cellDiagonal) && yRemainder)
        ) {
          this.x = tileToPixel(col)
          this.vx = 0
        }
      } else if (this.vx < 0) {
        if (nonEmptyCell(cell) || (nonEmptyCell(cellDown) && yRemainder)) {
          this.x = tileToPixel(col + 1)
          this.vx = 0
        }
      }

      if (this.vy > 0) {
        if (
          nonEmptyCell(cellDown) ||
          (nonEmptyCell(cellDiagonal) && xRemainder)
        ) {
          this.y = tileToPixel(row)
          this.vy = 0
        }
      } else if (this.vy < 0) {
        if (nonEmptyCell(cell) || (nonEmptyCell(cellRight) && xRemainder)) {
          this.y = tileToPixel(row + 1)
          this.vy = 0
        }
      }
    }
  }
}
