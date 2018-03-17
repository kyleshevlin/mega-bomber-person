const drawPlayer = (context, player) => {
  context.fillStyle = player.background
  context.fillRect(
    player.position.x,
    player.position.y,
    player.width,
    player.height
  )
}

export default drawPlayer
