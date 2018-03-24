import { ACCEL, CELL_SIZE, FRICTION } from '../constants'
import { tileToPixel } from '../utils'

export default function moverFactory(options = {}) {
  const { speed = 10, x = 0, y = 0 } = options

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
    position: {
      x,
      y
    },
    speed,

    update(grid) {
      this.oldVx = this.vx
      const wasMovingLeft = this.vx < 0
      const wasMovingRight = this.vx > 0
      const wasMovingUp = this.vy < 0
      const wasMovingDown = this.vy > 0

      if (this.input.left) {
        this.vx = -Math.min(Math.abs(this.vx) + this.accel, this.speed)
      } else if (wasMovingLeft) {
        this.vx = this.vx * this.friction
      }

      if (this.input.right) {
        this.vx = Math.min(this.vx + this.accel, this.speed)
      } else if (wasMovingRight) {
        this.vx = this.vx * this.friction
      }

      if (this.input.up) {
        this.vy = -Math.min(Math.abs(this.vy) + this.accel, this.speed)
      } else if (wasMovingUp) {
        this.vy = this.vy * this.friction
      }

      if (this.input.down) {
        this.vy = Math.min(this.vy + this.accel, this.speed)
      } else if (wasMovingDown) {
        this.vy = this.vy * this.friction
      }

      if ((wasMovingLeft && this.vx > 0) || (wasMovingRight && this.vx < 0)) {
        this.vx = 0
      }

      if ((wasMovingUp && this.vy > 0) || (wasMovingDown && this.vy < 0)) {
        this.vy = 0
      }

      this.position.x = this.position.x + this.vx
      this.position.y = this.position.y + this.vy

      // Edges
      if (this.position.x < 0) {
        this.position.x = 0
        this.vx = 0
      } else if (this.position.x + this.width > grid.length * CELL_SIZE) {
        this.position.x = grid.length * CELL_SIZE - this.width
        this.vx = 0
      }

      if (this.position.y < 0) {
        this.position.y = 0
        this.vy = 0
      } else if (this.position.y + this.height > grid[0].length * CELL_SIZE) {
        this.position.y = grid[0].length * CELL_SIZE - this.height
        this.vy = 0
      }

      const row = Math.floor(this.position.y / CELL_SIZE)
      const col = Math.floor(this.position.x / CELL_SIZE)

      // This is useful because if it is 0
      // then it can be used as a false value,
      // It also might be useful in determining how
      // to reposition the this before rendering
      const xRemainder = this.position.x % CELL_SIZE
      const yRemainder = this.position.y % CELL_SIZE

      const cell = grid[row][col]
      const cellRight = grid[row][col + 1]
      const cellDown = grid[row + 1][col]
      const cellDiagonal = grid[row + 1][col + 1]

      const collision = tile => tile !== ' '

      if (this.vx > 0) {
        const bool =
          (collision(cellRight) && !collision(cell)) ||
          (collision(cellDiagonal) && !collision(cellDown) && yRemainder)
        if (bool) {
          this.position.x = tileToPixel(col)
          this.vx = 0
        }
      } else if (this.vx < 0) {
        const bool =
          (collision(cell) && !collision(cellRight)) ||
          (collision(cellDown) && !collision(cellDiagonal) && yRemainder)
        if (bool) {
          this.position.x = tileToPixel(col + 1)
          this.vx = 0
        }
      }

      if (this.vy > 0) {
        const bool =
          (collision(cellDown) && !collision(cell)) ||
          (collision(cellDiagonal) && !collision(cellRight) && xRemainder)
        if (bool) {
          this.position.y = tileToPixel(row)
          this.vy = 0
        }
      } else if (this.vy < 0) {
        const bool =
          (collision(cell) && !collision(cellDown)) ||
          (collision(cellRight) && !collision(cellDiagonal) && xRemainder)
        if (bool) {
          this.position.y = tileToPixel(row + 1)
          this.vy = 0
        }
      }
    }
  }
}
