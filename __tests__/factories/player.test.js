import playerFactory from '../../src/js/factories/player'

describe('Player', () => {
  let player

  beforeEach(() => {
    player = playerFactory({ name: 'Test Player' })
  })

  it('should should have the right name', () => {
    expect(player.name).toEqual('Test Player')
  })

  it('should moveLeft', () => {
    player.moveLeft()
    expect(player.position.x).toEqual(0 - player.velocity)
  })

  it('should moveRight', () => {
    player.moveRight()
    expect(player.position.x).toEqual(0 + player.velocity)
  })

  it('should moveUp', () => {
    player.moveUp()
    expect(player.position.y).toEqual(0 - player.velocity)
  })

  it('should moveDown', () => {
    player.moveDown()
    expect(player.position.y).toEqual(0 + player.velocity)
  })
})
