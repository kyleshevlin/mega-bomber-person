import playerFactory from '../../src/js/factories/player'

describe('Player', () => {
  it('should should have the right name', () => {
    const name = 'Foo Bar'
    const player = playerFactory({ name })

    expect(player.name).toEqual(name)
  })
})
