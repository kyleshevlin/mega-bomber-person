import { CELL_SIZE } from '../constants'
import { collision, pixelToTile, tileToPixel } from '../utils'

export default function toucherFactory(entity) {
  return {
    touches(grid, types) {
      const { x, y } = entity
      let row = pixelToTile(y)
      let col = pixelToTile(x)

      const cellFactory = (rowTile, colTile) => ({
        height: CELL_SIZE,
        width: CELL_SIZE,
        x: tileToPixel(colTile),
        y: tileToPixel(rowTile)
      })

      const collidesWithTopLeft = collision(entity)(cellFactory(row, col))
      const collidesWithTopRight = collision(entity)(cellFactory(row, col + 1))
      const collidesWithBottomLeft = collision(entity)(
        cellFactory(row + 1, col)
      )
      const collidesWithBottomRight = collision(entity)(
        cellFactory(row + 1, col + 1)
      )

      const hasCollision =
        collidesWithTopLeft ||
        collidesWithTopRight ||
        collidesWithBottomLeft ||
        collidesWithBottomRight

      if (!hasCollision) {
        return false
      }

      const cells = [grid[row][col]]

      if (collidesWithTopRight) {
        cells.push(grid[row][col + 1])
      }

      if (collidesWithBottomLeft) {
        cells.push(grid[row + 1][col])
      }

      if (collidesWithBottomRight) {
        cells.push(grid[row + 1][col + 1])
      }

      console.log(cells)

      return cells.some(c => types.some(t => t === c))
    }
  }
}
