export const handleKeyDown = keys => event => {
  if (keys[event.key]) {
    keys[event.key].pressed = true
  }
}

export const handleKeyUp = keys => event => {
  if (keys[event.key]) {
    keys[event.key].pressed = false
  }
}
