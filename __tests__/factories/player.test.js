import playerFactory from '../../src/js/factories/player'

describe('Player', () => {
  let player

  beforeEach(() => {
    player = playerFactory({ name: 'Test Player' })
  })

  it('should should have the right name', () => {
    expect(player.name).toEqual('Test Player')
  })
})
