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

const edgeCollision = player => {
  const { height, width, position: { x, y } } = player
  const edge = { x: 0, y: 0, width: GRID_WIDTH, height: GRID_HEIGHT }

  if (
    x < edge.x ||
    y < edge.y ||
    x + width > edge.width ||
    y + height > edge.height
  ) {
    // Collision detected, adjust player
    let xAdj
    let yAdj

    if (x < edge.x) {
      xAdj = edge.x - x
    }

    if (y < edge.y) {
      yAdj = edge.y - y
    }

    if (x + width > edge.width) {
      xAdj = edge.width - (x + width)
    }

    if (y + height > edge.height) {
      yAdj = edge.height - (y + height)
    }

    player.adjust(xAdj, yAdj)
  }
}

function update() {
  // Calculate positions
  players.forEach(playerActions)

  // Calculate Collisions
  players.forEach(edgeCollision)

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
