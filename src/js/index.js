import { CELL_SIZE, STEP } from './constants'
import { keys, addKeyListeners } from './shared/keys'
import { compose, collision, timestamp } from './utils'
import playerFactory from './factories/player'
import renderBackground from './renders/background'
import renderGrid from './renders/grid'
import renderPlayer from './renders/player'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const grid = [
  [' ', ' ', 'c', 'c', 'c', 'c', 'c', ' ', ' '],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
  ['c', ' ', 'c', ' ', 'c', ' ', 'c', ' ', 'c'],
  ['c', 'x', 'c', 'x', 'c', 'x', ' ', 'x', 'c'],
  ['c', ' ', 'c', ' ', ' ', ' ', 'c', ' ', 'c'],
  ['c', 'x', ' ', 'x', 'c', 'x', 'c', 'x', 'c'],
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
      xPos = GRID_WIDTH - width
    }

    if (y + height > GRID_HEIGHT) {
      yPos = GRID_HEIGHT - height
    }

    player.reposition(xPos, yPos)
  }

  return player
}

const gridCollision = grid => player => {
  const { height, width, position: { x, y } } = player
  const slimPlayer = { height, width, x, y }
  const playerCollision = collision(slimPlayer)

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
          x: colIndex * CELL_SIZE,
          y: rowIndex * CELL_SIZE
        })
      }
    })
  })

  if (hasCollision) {
    const box = {
      height: CELL_SIZE,
      width: CELL_SIZE,
      x: colIndex * CELL_SIZE,
      y: rowIndex * CELL_SIZE
    }

    console.log('box', box)
    console.log('player', { height, width, x, y })
  }

  return player
}

const playerCollisions = compose(gridCollision(grid), edgeCollision)

const update = step => {
  // Calculate positions
  players.forEach(playerActions)

  // Calculate Collisions
  players.forEach(playerCollisions)
}

const render = (ctx, counter, dt) => {
  // Draw
  renderBackground(ctx, GRID_WIDTH, GRID_HEIGHT)
  renderGrid(ctx, grid)
  players.forEach(player => {
    renderPlayer(ctx, player)
  })
}

let counter = 0
let dt = 0
let now
let last = timestamp()

function loop() {
  now = timestamp()

  // Bind dt to adding no more than 1 second of updates
  dt = dt + Math.min(1, (now - last) / 1000)

  while (dt > STEP) {
    dt = dt - STEP
    update(STEP)
  }

  render(ctx, counter, dt)
  last = now
  counter++
  window.requestAnimationFrame(loop)
}

loop()
