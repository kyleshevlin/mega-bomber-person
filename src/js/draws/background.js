const drawBackground = (context, width, height) => {
  context.clearRect(0, 0, width, height)
  context.fillStyle = 'green'
  context.fillRect(0, 0, width, height)
}

export default drawBackground
