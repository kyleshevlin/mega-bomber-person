import { CELL_SIZE } from './constants'
import keyFactory from './factories/key'
import playerFactory from './factories/player'
import { handleKeyDown, handleKeyUp } from './events'

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

function drawBackground(ctx) {
  ctx.clearRect(0, 0, GRID_WIDTH, GRID_HEIGHT)
  ctx.fillStyle = 'green'
  ctx.fillRect(0, 0, GRID_WIDTH, GRID_HEIGHT)
}

function drawGrid(ctx, grid) {
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      switch (col) {
        case 'c':
          ctx.fillStyle = 'tan'
          break

        case 'x':
          ctx.fillStyle = 'gray'
          break

        default:
          break
      }

      if (col !== ' ') {
        ctx.fillRect(
          rowIndex * CELL_SIZE,
          colIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        )
      }
    })
  })
}

function drawPlayer(ctx, player) {
  ctx.fillStyle = player.background
  playerActions(player)
  ctx.fillRect(
    player.position.x,
    player.position.y,
    player.width,
    player.height
  )
}

function draw() {
  drawBackground(ctx)
  drawGrid(ctx, grid)

  players.forEach(player => {
    drawPlayer(ctx, player)
  })
}

function loop() {
  draw()
  window.requestAnimationFrame(loop)
}

loop()
