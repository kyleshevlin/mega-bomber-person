import moverFactory from '../../src/js/factories/mover'

describe('Mover', () => {
  let mover

  beforeEach(() => {
    mover = moverFactory({})
  })

  it('should have a default starting point of 0, 0', () => {
    expect(mover.position.x).toEqual(0)
    expect(mover.position.y).toEqual(0)
  })

  it('moveLeft', () => {
    const startingX = mover.position.x

    expect(startingX).toEqual(0)

    mover.moveLeft()
    expect(mover.position.x).toEqual(startingX - mover.velocity)
  })

  it('moveUp', () => {
    const startingY = mover.position.y

    expect(startingY).toEqual(0)

    mover.moveUp()
    expect(mover.position.y).toEqual(startingY - mover.velocity)
  })

  it('moveRight', () => {
    const startingX = mover.position.x

    expect(startingX).toEqual(0)

    mover.moveRight()
    expect(mover.position.x).toEqual(startingX + mover.velocity)
  })

  it('moveDown', () => {
    const startingY = mover.position.y

    expect(startingY).toEqual(0)

    mover.moveDown()
    expect(mover.position.y).toEqual(startingY + mover.velocity)
  })

  it('reposition', () => {
    mover.reposition(2, 3)
    expect(mover.position.x).toEqual(2)
    expect(mover.position.y).toEqual(3)

    mover.reposition(-2, -3)
    expect(mover.position.x).toEqual(-2)
    expect(mover.position.y).toEqual(-3)

    // Should do nothing
    mover.reposition()
    expect(mover.position.x).toEqual(-2)
    expect(mover.position.y).toEqual(-3)

    mover.reposition(null, 0)
    expect(mover.position.x).toEqual(-2)
    expect(mover.position.y).toEqual(0)

    mover.reposition(0)
    expect(mover.position.x).toEqual(0)
    expect(mover.position.y).toEqual(0)
  })
})
