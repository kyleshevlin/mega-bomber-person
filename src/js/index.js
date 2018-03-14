import { CELL_SIZE } from './constants'
import playerFactory from './players'
import keyFactory from './keys'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

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

const character = playerFactory()

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
        x < gx + character.width &&
        x + character.width > gx &&
        y < gy + character.height &&
        y + character.height > gy
      ) {
        collision = true
      }
    }
  }

  return collision
}

const aKey = keyFactory('a')
const sKey = keyFactory('s')
const dKey = keyFactory('d')
const wKey = keyFactory('w')
const arrowLeftKey = keyFactory('ArrowLeft')
const arrowDownKey = keyFactory('ArrowDown')
const arrowRightKey = keyFactory('ArrowRight')
const arrowUpKey = keyFactory('ArrowUp')

const handleKeyDown = event => {
  switch (event.key) {
    case 'a':
    case 'ArrowLeft':
      aKey.pressed = true
      arrowLeftKey.pressed = true
      break

    case 's':
    case 'ArrowDown':
      sKey.pressed = true
      arrowDownKey.pressed = true
      break

    case 'd':
    case 'ArrowRight':
      dKey.pressed = true
      arrowRightKey.pressed = true
      break

    case 'w':
    case 'ArrowUp':
      wKey.pressed = true
      arrowUpKey.pressed = true
      break

    default:
      break
  }
}

const handleKeyUp = event => {
  switch (event.key) {
    case 'a':
    case 'ArrowLeft':
      aKey.pressed = false
      arrowLeftKey.pressed = false
      break

    case 's':
    case 'ArrowDown':
      sKey.pressed = false
      arrowDownKey.pressed = false
      break

    case 'd':
    case 'ArrowRight':
      dKey.pressed = false
      arrowRightKey.pressed = false
      break

    case 'w':
    case 'ArrowUp':
      wKey.pressed = false
      arrowUpKey.pressed = false
      break

    default:
      break
  }
}

// Event Listeners
document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

const nextPos = ({ speed, x, y }, operator) => {
  switch (operator) {
    case 'subX':
      return { x: x - speed, y }

    case 'addY':
      return { x, y: y + speed }

    case 'addX':
      return { x: x + speed, y }

    case 'subY':
      return { x, y: y - speed }

    default:
      break
  }
}

const characterMovement = () => {
  if (aKey.pressed || arrowLeftKey.pressed) {
    if (!gridCollision(nextPos(character, 'subX'))) {
      character.x -= character.speed
    }
  }

  if (sKey.pressed || arrowDownKey.pressed) {
    if (!gridCollision(nextPos(character, 'addY'))) {
      character.y += character.speed
    }
  }

  if (dKey.pressed || arrowRightKey.pressed) {
    if (!gridCollision(nextPos(character, 'addX'))) {
      character.x += character.speed
    }
  }

  if (wKey.pressed || arrowUpKey.pressed) {
    if (!gridCollision(nextPos(character, 'subY'))) {
      character.y -= character.speed
    }
  }
}

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
  characterMovement()
  ctx.fillRect(character.x, character.y, character.width, character.height)
}

function loop() {
  draw()
  window.requestAnimationFrame(loop)
}

loop()
