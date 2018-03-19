import liverFactory from '../../src/js/factories/liver'

describe('Liver', () => {
  let liver

  beforeEach(() => {
    liver = liverFactory()
  })

  it('should start off alive', () => {
    expect(liver.alive).toEqual(true)
  })

  it('should die', () => {
    liver.die()
    expect(liver.alive).toEqual(false)
  })

  it('should revive', () => {
    liver.die()
    expect(liver.alive).toEqual(false)

    liver.revive()
    expect(liver.alive).toEqual(true)
  })

  it('should increment health', () => {
    liver.incrementHealth()
    expect(liver.health).toEqual(4)
  })

  it('should decrement health', () => {
    liver.decrementHealth()
    expect(liver.health).toEqual(2)
  })
})
