export const handleKeyDown = keys => event => {
  if (keys[event.keyCode]) {
    keys[event.keyCode].pressed = true
  }
}

export const handleKeyUp = keys => event => {
  if (keys[event.keyCode]) {
    keys[event.keyCode].pressed = false
  }
}
