import { ACCEL, CELL_SIZE, FRICTION } from '../constants'
import { tileToPixel } from '../utils'

export default function moverFactory(entity) {
  const { speed = 10, x = 0, y = 0 } = entity

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

    update(grid) {
      const wasMovingLeft = this.vx < 0
      const wasMovingRight = this.vx > 0
      const wasMovingUp = this.vy < 0
      const wasMovingDown = this.vy > 0

      if (this.input.left) {
        this.vx = -Math.min(Math.abs(this.vx) + this.accel, this.speed)
      } else if (wasMovingLeft) {
        this.vx = this.vx > 0.005 ? this.vx * this.friction : 0
      }

      if (this.input.right) {
        this.vx = Math.min(this.vx + this.accel, this.speed)
      } else if (wasMovingRight) {
        this.vx = this.vx > 0.005 ? this.vx * this.friction : 0
      }

      if (this.input.up) {
        this.vy = -Math.min(Math.abs(this.vy) + this.accel, this.speed)
      } else if (wasMovingUp) {
        this.vy = this.vy > 0.005 ? this.vy * this.friction : 0
      }

      if (this.input.down) {
        this.vy = Math.min(this.vy + this.accel, this.speed)
      } else if (wasMovingDown) {
        this.vy = this.vy > 0.005 ? this.vy * this.friction : 0
      }

      if ((wasMovingLeft && this.vx > 0) || (wasMovingRight && this.vx < 0)) {
        this.vx = 0
      }

      if ((wasMovingUp && this.vy > 0) || (wasMovingDown && this.vy < 0)) {
        this.vy = 0
      }

      this.x = this.x + this.vx
      this.y = this.y + this.vy

      // Edges
      if (this.x < 0) {
        this.x = 0
        this.vx = 0
      } else if (this.x + this.width > grid.length * CELL_SIZE) {
        this.x = grid.length * CELL_SIZE - this.width
        this.vx = 0
      }

      if (this.y < 0) {
        this.y = 0
        this.vy = 0
      } else if (this.y + this.height > grid[0].length * CELL_SIZE) {
        this.y = grid[0].length * CELL_SIZE - this.height
        this.vy = 0
      }

      const row = Math.floor(this.y / CELL_SIZE)
      const col = Math.floor(this.x / CELL_SIZE)

      // This is useful because if it is 0
      // then it can be used as a false value,
      // It also might be useful in determining how
      // to reposition the this before rendering
      const xRemainder = this.x % CELL_SIZE
      const yRemainder = this.y % CELL_SIZE

      const cell = grid[row][col]
      const cellRight = grid[row][col + 1]
      const cellDown = grid[row + 1][col]
      const cellDiagonal = grid[row + 1][col + 1]

      const collision = tile => tile !== ' '

      if (this.vx > 0) {
        if (
          (collision(cellRight) && !collision(cell)) ||
          (collision(cellDiagonal) && !collision(cellDown) && yRemainder)
        ) {
          this.x = tileToPixel(col)
          this.vx = 0
        }
      } else if (this.vx < 0) {
        if (
          (collision(cell) && !collision(cellRight)) ||
          (collision(cellDown) && !collision(cellDiagonal) && yRemainder)
        ) {
          this.x = tileToPixel(col + 1)
          this.vx = 0
        }
      }

      if (this.vy > 0) {
        if (
          (collision(cellDown) && !collision(cell)) ||
          (collision(cellDiagonal) && !collision(cellRight) && xRemainder)
        ) {
          this.y = tileToPixel(row)
          this.vy = 0
        }
      } else if (this.vy < 0) {
        if (
          (collision(cell) && !collision(cellDown)) ||
          (collision(cellRight) && !collision(cellDiagonal) && xRemainder)
        ) {
          this.y = tileToPixel(row + 1)
          this.vy = 0
        }
      }
    }
  }
}
