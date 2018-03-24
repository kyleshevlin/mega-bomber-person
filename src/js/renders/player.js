const renderPlayer = (context, player) => {
  context.fillStyle = player.background
  context.fillRect(player.x, player.y, player.width, player.height)
}

export default renderPlayer
