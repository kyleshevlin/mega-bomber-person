import { CELL_SIZE } from './constants'
import { keys, addKeyListeners } from './shared/keys'
import playerFactory from './factories/player'
import drawBackground from './draws/background'
import drawGrid from './draws/grid'
import drawPlayer from './draws/player'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const grid = [
  [' ', ' ', 'c', 'c', 'c', 'c', 'c', ' ', ' '],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
  ['c', ' ', 'c', ' ', 'c', ' ', 'c', ' ', 'c'],
  ['c', 'x', 'c', 'x', 'c', 'x', 'c', 'x', 'c'],
  ['c', ' ', 'c', ' ', 'c', ' ', 'c', ' ', 'c'],
  ['c', 'x', 'c', 'x', 'c', 'x', 'c', 'x', 'c'],
  ['c', ' ', 'c', ' ', 'c', ' ', 'c', ' ', 'c'],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
  [' ', ' ', 'c', 'c', 'c', 'c', 'c', ' ', ' ']
]

const GRID_WIDTH = CELL_SIZE * grid.length
const GRID_HEIGHT = CELL_SIZE * grid[0].length

canvas.width = GRID_WIDTH
canvas.height = GRID_HEIGHT

const player1 = playerFactory({ name: 'Player 1' })
const players = [player1]

// Event Listeners
addKeyListeners()

const playerActions = player => {
  if (keys.left.pressed) {
    player.moveLeft()
  }

  if (keys.down.pressed) {
    player.moveDown()
  }

  if (keys.right.pressed) {
    player.moveRight()
  }

  if (keys.up.pressed) {
    player.moveUp()
  }

  if (keys.spacebar.pressed) {
    player.dropBomb()
  }
}

const collision = box1 => box2 =>
  box1.x < box2.x + box2.width &&
  box1.x + box1.width > box2.x &&
  box1.y < box2.y + box2.height &&
  box1.y + box1.height > box2.y

const edgeCollision = player => {
  const { height, width, position: { x, y } } = player
  const edge = { x: 0, y: 0, width: GRID_WIDTH, height: GRID_HEIGHT }

  if (collision({ height, width, x, y })(edge)) {
    let xPos
    let yPos

    if (x < 0) {
      xPos = 0
    }

    if (y < 0) {
      yPos = 0
    }

    if (x + width > GRID_WIDTH) {
      xPos = GRID_WIDTH
    }

    if (y + height > GRID_HEIGHT) {
      yPos = GRID_HEIGHT
    }

    player.reposition(xPos, yPos)
  }

  return player
}

const gridCollision = (grid, player) => {
  const { height, width, position: { x, y } } = player
  const playerCollision = collision({ height, width, x, y })

  let rowIndex = -1
  let colIndex = -1
  const hasCollision = grid.some(row => {
    rowIndex++
    colIndex = -1

    return row.some(col => {
      colIndex++

      if (grid[rowIndex][colIndex] === ' ') {
        return false
      } else {
        return playerCollision({
          height: CELL_SIZE,
          width: CELL_SIZE,
          x: rowIndex * CELL_SIZE,
          y: colIndex * CELL_SIZE
        })
      }
    })
  })

  if (hasCollision) {
    const box = {
      height: CELL_SIZE,
      width: CELL_SIZE,
      x: rowIndex * CELL_SIZE,
      y: colIndex * CELL_SIZE
    }

    console.log('box', box)
    console.log('player', { height, width, x, y })
  }

  return player
}

function update() {
  // Calculate positions
  players.forEach(playerActions)

  // Calculate Collisions
  players.forEach(player => {
    gridCollision(grid, edgeCollision(player))
  })

  // Adjust in response to collisions

  // Draw
  drawBackground(ctx, GRID_WIDTH, GRID_HEIGHT)
  drawGrid(ctx, grid)
  players.forEach(player => {
    drawPlayer(ctx, player)
  })
}

function loop() {
  update()
  window.requestAnimationFrame(loop)
}

loop()
