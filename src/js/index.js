;(function() {
  const canvas = document.getElementById('game')
  const ctx = canvas.getContext('2d')

  const CELL_SIZE = 50

  const grid = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
  ]

  canvas.width = CELL_SIZE * grid.length
  canvas.height = CELL_SIZE * grid[0].length

  const character = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    background: 'red',
    bombs: 1,
    fireLength: 3
  }

  const state = {
    character: {
      x: 0,
      y: 0,
      speed: 10
    }
  }

  const gridCollision = ({ x, y }) => {
    const rowLength = grid.length
    let collision = false
    let row, col

    for (row = 0; row < rowLength; row++) {
      const colLength = grid[row].length

      for (col = 0; col < colLength; col++) {
        if (collision) {
          break
        }

        if (grid[row][col] !== 'x') {
          continue
        }

        const gx = row * CELL_SIZE
        const gy = col * CELL_SIZE

        if (
          x < gx + CELL_SIZE &&
          x + CELL_SIZE > gx &&
          y < gy + CELL_SIZE &&
          y + CELL_SIZE > gy
        ) {
          collision = true
        }
      }
    }

    return collision
  }

  // Needs logic to say we can't move through a certain point/wall
  const movement = event => {
    const { character: { x, y, speed } } = state

    switch (event.key) {
      case 'a':
      case 'ArrowLeft': {
        if (x !== 0) {
          const nextPos = {
            x: x - speed,
            y
          }

          if (!gridCollision(nextPos)) {
            state.character.x = x - speed
          }
        }
        break
      }

      case 's':
      case 'ArrowDown': {
        if (y !== canvas.height - CELL_SIZE) {
          const nextPos = {
            x,
            y: y + speed
          }

          if (!gridCollision(nextPos)) {
            state.character.y = y + speed
          }
        }
        break
      }

      case 'd':
      case 'ArrowRight':
        if (x !== canvas.width - CELL_SIZE) {
          const nextPos = {
            x: x + speed,
            y
          }

          if (!gridCollision(nextPos)) {
            state.character.x = x + speed
          }
        }
        break

      case 'w':
      case 'ArrowUp':
        if (y !== 0) {
          const nextPos = {
            x,
            y: y - speed
          }

          if (!gridCollision(nextPos)) {
            state.character.y = y - speed
          }
        }
        break

      default:
        break
    }
  }

  // Event Listeners
  document.addEventListener('keydown', movement)

  function draw() {
    // Background
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Impassible objects O(m*n)
    grid.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 'x') {
          ctx.fillStyle = 'gray'
          ctx.fillRect(
            rowIndex * CELL_SIZE,
            colIndex * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          )
        }
      })
    })

    // Character
    ctx.fillStyle = character.background
    ctx.fillRect(
      state.character.x,
      state.character.y,
      character.width,
      character.height
    )
  }

  function loop() {
    draw()
    requestAnimationFrame(loop)
  }

  loop()
})()
