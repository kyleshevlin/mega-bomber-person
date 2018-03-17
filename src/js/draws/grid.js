import { CELL_SIZE } from '../constants'

const drawGrid = (context, grid) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      switch (col) {
        case 'c':
          context.fillStyle = 'tan'
          break

        case 'x':
          context.fillStyle = 'gray'
          break

        default:
          break
      }

      if (col !== ' ') {
        context.fillRect(
          rowIndex * CELL_SIZE,
          colIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        )
      }
    })
  })
}

export default drawGrid
