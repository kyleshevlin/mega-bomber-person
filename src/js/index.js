import { CELL_SIZE, STEP } from './constants'
import { keys, addKeyListeners } from './shared/keys'
import { timestamp } from './utils'
import playerFactory from './factories/player'
import renderBackground from './renders/background'
import renderGrid from './renders/grid'
import renderPlayer from './renders/player'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const grid = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
  [' ', 'u', ' ', ' ', 'c', ' ', ' ', ' ', ' '],
  [' ', 'x', ' ', 'x', 'c', 'x', ' ', 'x', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', 'x', ' ', 'x', 'c', 'x', ' ', 'x', ' '],
  [' ', ' ', ' ', ' ', 'c', ' ', ' ', ' ', ' '],
  [' ', 'x', ' ', 'x', ' ', 'x', ' ', 'x', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
]

const GRID_WIDTH = CELL_SIZE * grid.length
const GRID_HEIGHT = CELL_SIZE * grid[0].length

canvas.width = GRID_WIDTH
canvas.height = GRID_HEIGHT

const player = playerFactory({ name: 'Player' })

// Event Listeners
addKeyListeners()

const playerActions = player => {
  player.input.left = keys.left.pressed
  player.input.right = keys.right.pressed
  player.input.up = keys.up.pressed
  player.input.down = keys.down.pressed

  if (keys.spacebar.pressed) {
    player.dropBomb()
  }
}

const update = step => {
  playerActions(player)
  player.update(grid, step)
}

const render = (ctx, dt) => {
  renderBackground(ctx, GRID_WIDTH, GRID_HEIGHT)
  renderGrid(ctx, grid)
  renderPlayer(ctx, player)
}

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

  render(ctx, dt)
  last = now
  window.requestAnimationFrame(loop)
}

loop()

// Helps with debugging
window.player = player
window.grid = grid
