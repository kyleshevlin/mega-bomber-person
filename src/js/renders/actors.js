import { SCALE } from '../constants'

const renderActors = (context, actors) => {
  actors.forEach(actor => {
    switch (actor.type) {
      case 'combustible':
        context.fillStyle = 'tan'
        break

      case 'player':
        context.fillStyle = actor.background
        break

      default:
        break
    }

    context.fillRect(actor.x * SCALE, actor.y * SCALE, SCALE, SCALE)
  })
}

export default renderActors
