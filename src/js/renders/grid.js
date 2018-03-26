import { CELL_SIZE } from '../constants'

const renderGrid = (context, grid) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      switch (col) {
        case 'c':
          context.fillStyle = 'tan'
          break

        case 'u':
          context.fillStyle = 'rebeccapurple'
          break

        case 'x':
          context.fillStyle = 'gray'
          break

        default:
          break
      }

      if (col !== ' ') {
        context.fillRect(
          colIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        )
      }
    })
  })
}

export default renderGrid
