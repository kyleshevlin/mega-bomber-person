import { CELL_SIZE } from './constants'
import keyFactory from './factories/key'
import playerFactory from './factories/player'
import { handleKeyDown, handleKeyUp } from './events'
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

// Keys
const arrowLeftKey = keyFactory(37)
const arrowUpKey = keyFactory(38)
const arrowRightKey = keyFactory(39)
const arrowDownKey = keyFactory(40)
const spaceBar = keyFactory(32)
const keys = [
  arrowLeftKey,
  arrowUpKey,
  arrowRightKey,
  arrowDownKey,
  spaceBar
].reduce((acc, cur) => {
  acc[cur.code] = cur
  return acc
}, {})

// Event Listeners
document.addEventListener('keydown', handleKeyDown(keys))
document.addEventListener('keyup', handleKeyUp(keys))

const playerActions = player => {
  if (arrowLeftKey.pressed) {
    player.moveLeft()
  }

  if (arrowDownKey.pressed) {
    player.moveDown()
  }

  if (arrowRightKey.pressed) {
    player.moveRight()
  }

  if (arrowUpKey.pressed) {
    player.moveUp()
  }

  if (spaceBar.pressed) {
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
