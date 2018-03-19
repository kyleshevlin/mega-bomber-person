const pressFactory = () => ({
  pressed: false
})

const keyCodeToName = {
  32: 'spacebar',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

export const keys = Object.values(keyCodeToName).reduce((acc, cur) => {
  acc[cur] = pressFactory()
  return acc
}, {})

const handleKeyDown = e => {
  if (keyCodeToName[e.keyCode]) {
    keys[keyCodeToName[e.keyCode]].pressed = true
  }
}

const handleKeyUp = e => {
  if (keyCodeToName[e.keyCode]) {
    keys[keyCodeToName[e.keyCode]].pressed = false
  }
}

export const addKeyListeners = () => {
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
}

export const removeKeyListeners = () => {
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
}
