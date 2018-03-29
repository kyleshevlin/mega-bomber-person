import { SCALE } from '../constants'

const renderGrid = (context, grid) => {
  grid.rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      switch (col) {
        case 'empty':
          context.fillStyle = 'green'
          break

        case 'wall':
          context.fillStyle = 'gray'
          break

        default:
          break
      }

      if (col !== ' ') {
        context.fillRect(colIndex * SCALE, rowIndex * SCALE, SCALE, SCALE)
      }
    })
  })
}

export default renderGrid
